import {
  AfterViewInit,
  Component,
  DestroyRef,
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
import { InputTextModule } from 'primeng/inputtext';
import { FormControl, FormGroup } from '@angular/forms';
import { FiltersFormModel } from './models/filters-form.model';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';

type TabId = string; // a team id or 'strava'

@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  protected readonly teams: Team[] = TEAMS;

  protected readonly activeTab = signal<TabId>(TEAMS[0].id);
  
  protected readonly selectedEventId = signal<string | null>(TEAMS[0].events[0].id);

  protected readonly activeTeam = computed(() => this.teams.find((t) => t.id === this.activeTab()));
  
  protected readonly selectedEvent = computed<RaceEvent | undefined>(() =>
    this.activeTeam()?.events.find((e) => e.id === this.selectedEventId())
  );

  protected filterForm = new FormGroup<FiltersFormModel>({
    name: new FormControl<string | null>(''),
    startDate: new FormControl<Date | null>(null),
    endDate: new FormControl<Date | null>(null),
    quickerThan: new FormControl<string | null>(''),
    slowerThan: new FormControl<string | null>(''),
    lessThanPlace: new FormControl<number | null>(null),
    greaterThanPlace: new FormControl<number | null>(null),
  });

  private readonly filterValue = toSignal(this.filterForm.valueChanges, {
    initialValue: this.filterForm.value
  });
  
  protected readonly sortedRaces = computed<Race[]>(() => {
    const ev = this.selectedEvent();
    if (!ev) return [];

    // Sort the base races
    const baseRaces = [...ev.races].sort((a, b) => a.date.localeCompare(b.date));
    const filter = this.filterValue();

    // Filter them based on the current form value state
    return baseRaces.filter((r) => {
      const nameMatch = !filter.name || r.meet.toLowerCase().includes(filter.name.toLowerCase());
      const startDateMatch = !filter.startDate || new Date(r.date) >= filter.startDate;
      const endDateMatch = !filter.endDate || new Date(r.date) <= filter.endDate;
      const quickerThanMatch = !filter.quickerThan || parseTime(r.time) < parseTime(filter.quickerThan);
      const slowerThanMatch = !filter.slowerThan || parseTime(r.time) > parseTime(filter.slowerThan);
      const lessThanPlaceMatch = !filter.lessThanPlace || r.place < filter.lessThanPlace;
      const greaterThanPlaceMatch = !filter.greaterThanPlace || r.place > filter.greaterThanPlace;
      return nameMatch && startDateMatch && endDateMatch && quickerThanMatch && slowerThanMatch && lessThanPlaceMatch && greaterThanPlaceMatch;
    });
  });
  
  protected readonly pr = computed(() => {
    const best = personalBest(this.sortedRaces());
    return best ? formatTime(parseTime(best.time)) : '';
  });

  @ViewChild('chart') private chartEl!: ElementRef<HTMLDivElement>;
  
  private readonly destroyRef = inject(DestroyRef)

  constructor() {
    effect(() => {
      const el = this.chartEl?.nativeElement;
      const races = this.sortedRaces();
      if (el && races.length) this.drawChart(el, races);
    });

    effect(() => {
      const selectedEvent = this.selectedEvent();
      if (selectedEvent) {
        this.filterForm.reset();
      }
    })
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