import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import * as Plotly from 'plotly.js-dist-min';

import { TEAMS } from './data/races.data';
import { Race, RaceEvent, Team, formatTime, parseTime, personalBest } from './models/race.model';

type TabId = string; // a team id or 'strava'

@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  readonly teams: Team[] = TEAMS;

  readonly activeTab = signal<TabId>(TEAMS[0].id);
  readonly selectedEventId = signal<string | null>(TEAMS[0].events[0].id);

  readonly activeTeam = computed(() => this.teams.find((t) => t.id === this.activeTab()));
  readonly selectedEvent = computed<RaceEvent | undefined>(() =>
    this.activeTeam()?.events.find((e) => e.id === this.selectedEventId())
  );
  readonly sortedRaces = computed<Race[]>(() => {
    const ev = this.selectedEvent();
    return ev ? [...ev.races].sort((a, b) => a.date.localeCompare(b.date)) : [];
  });
  readonly pr = computed(() => {
    const best = personalBest(this.sortedRaces());
    return best ? formatTime(parseTime(best.time)) : '';
  });

  @ViewChild('chart') private chartEl!: ElementRef<HTMLDivElement>;

  constructor() {
    // Redraw whenever the chart div exists and the selected event changes.
    effect(() => {
      const el = this.chartEl?.nativeElement;
      const races = this.sortedRaces();
      if (el && races.length) this.drawChart(el, races);
    });
  }

  selectTab(id: TabId): void {
    this.activeTab.set(id);
    const team = this.teams.find((t) => t.id === id);
    this.selectedEventId.set(team ? team.events[0].id : null);
  }

  selectEvent(id: string): void {
    this.selectedEventId.set(id);
  }

  private drawChart(el: HTMLDivElement, races: Race[]): void {
    const idx = races.map((_, i) => i);
    const labels = races.map((r) => r.date); // or format as MM/DD/YY below
    const times = races.map((r) => parseTime(r.time));
    const places = races.map((r) => r.place);

    const traces: Partial<Plotly.Data>[] = [
      {
        x: idx,
        y: times,
        mode: 'lines+markers',
        name: 'Time',
        marker: { color: 'rgb(219, 64, 82)', size: 8 },
        line: { color: 'rgb(219, 64, 82)', width: 1 },
        text: races.map((r) => r.time),
        customdata: races.map((r) => `${r.meet}<br>${r.date}`) as any,
        hovertemplate: 'Time: %{text}<br>%{customdata}<extra></extra>',
      },
      {
        x: idx,
        y: places,
        mode: 'lines+markers',
        name: 'Place',
        yaxis: 'y2',
        marker: { color: 'rgb(55, 128, 191)', size: 8 },
        line: { color: 'rgb(55, 128, 191)', width: 1 },
        customdata: races.map((r) => `${r.meet}<br>${r.date}`) as any,
        hovertemplate: 'Place: %{y}<br>%{customdata}<extra></extra>',
      },
    ];

    const min = Math.floor(Math.min(...times) / 15) * 15;
    const max = Math.ceil(Math.max(...times) / 15) * 15;
    const tickvals: number[] = [];
    for (let t = min; t <= max; t += 15) tickvals.push(t);

    const layout: Partial<Plotly.Layout> = {
      xaxis: {
        title: { text: 'Race' },
        tickvals: idx,
        ticktext: labels,
        tickangle: -45,
        range: [-0.5, races.length - 0.5],
      },
      yaxis: {
        title: { text: 'Time' },
        tickvals,
        ticktext: tickvals.map((t) => formatTime(t).replace(/\.00$/, '')),
      },
      yaxis2: { title: { text: 'Place' }, overlaying: 'y', side: 'right', autorange: true },
      margin: { b: 90 },
    };

    Plotly.react(el, traces as Plotly.Data[], layout as Plotly.Layout, { responsive: true });
  }
}