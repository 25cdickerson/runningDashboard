import { Race, Team } from '../models/race.model';

const MS = 'https://oh.milesplit.com/meets/';
const TF = 'https://www.tfrrs.org/results/';

/** Small helper so each race stays one line. Relative urls get the given base prepended. */
const race = (meet: string, date: string, time: string, place: number, url?: string, base = ''): Race => ({
  meet,
  date,
  time,
  place,
  url: url ? (url.startsWith('http') ? url : base + url) : undefined,
});
const ms = (meet: string, date: string, time: string, place: number, path?: string) =>
  race(meet, date, time, place, path, MS);
const tf = (meet: string, date: string, time: string, place: number, path?: string) =>
  race(meet, date, time, place, path, TF);

export const TEAMS: Team[] = [
  {
    id: 'high-school',
    label: 'Kings High School',
    logo: 'assets/Logos/kings.png',
    events: [
      {
        id: 'hs-5k-xc',
        label: '5k (XC)',
        races: [
          ms('OHSAA Early Season Invitational', '2017-08-19', '19:28.50', 70, '287842-ohsaa-early-season-invitational-2017/results/533597/formatted/'),
          ms("Dual at the DeWine's", '2017-09-02', '18:32.35', 51, '289957-dual-at-the-dewines-2017/results/536476/formatted/'),
          ms('Tiffin Cross Country Carnival', '2017-09-09', '18:43.90', 107, '288187-tiffin-cross-country-carnival-2017/results/538698/formatted/'),
          ms('Saturday Night Lights/ Centerville Stampede', '2017-09-23', '19:10.70', 105, '288203-saturday-night-lights-centerville-stampede-2017/results/544397/formatted/'),
          ms('Kings Invitational Presented by Buckeye Running Company', '2017-09-26', '19:28.53', 21, '294401-kings-invitational-presented-by-buckeye-running-company-2017/results/555264/formatted/'),
          ms('Neal Charske Firebird Invitational', '2017-09-30', '18:47.00', 69, '288206-neal-charske-firebird-invitational-2017/results/547193/formatted/'),
          ms('Eastern Cincinnati Conference Championship', '2017-10-14', '18:46.09', 29, '294695-eastern-cincinnati-conference-championship-2017/results/556688/formatted/'),
          ms('OHSAA Early Season Invitational', '2018-08-18', '19:02.50', 168, '324552-ohsaa-early-season-invitational-2018/results/599291/formatted/'),
          ms('Lakota East Classic', '2018-08-25', '18:33.20', 40, '325474-lakota-east-classic-2018/results/600686/formatted/'),
          ms('Duel at Dewine', '2018-09-01', '19:59.52', 34, '328549-duel-at-the-dewines-2018/results/602356/formatted/'),
          ms('Tiffin Cross Country Invitational', '2018-09-08', '18:27.10', 14, '325574-tiffin-cross-country-carnival-2018/results/604044/formatted/'),
          ms('Friendship Cross Country Invitational', '2018-09-15', '18:35.70', 109, '325583-cedarville-friendship-cross-country-invitational-2018/results/606078/formatted/Cedarville'),
          ms('Saturday Night Lights IX', '2018-09-22', '18:26.30', 201, '325698-saturday-night-lights-ix-2018/results/608370/formatted/'),
          ms('Kings Invitational', '2018-09-25', '19:08.08', 4, '330550-kings-invitational-2018/results/609059/formatted'),
          ms('Neal Charske Firebird Invitational', '2018-09-29', '18:16.90', 105, '325703-neal-charske-firebird-invitational-2018/results/610968/formatted'),
          ms('Ed Leas Fall Classic Invitational', '2018-10-06', '18:47.00', 1, '331740-ed-leas-fall-classic-invitational-2018/results/613241/formatted/'),
          ms('ECC Championship', '2018-10-13', '18:07.80', 8, '332661-ecc-championship-2018/results'),
          ms('OHSAA Early Season Invitational', '2019-08-17', '18:40.50', 123, '363903-ohsaa-early-season-invitational-2019/results/660014/formatted/'),
          ms('Lakota East Classic', '2019-08-24', '17:59.20', 22, '364450-lakota-east-classic-2019/results'),
          ms("Dual at the DeWine's", '2019-08-31', '17:41.61', 13, '366382-dual-at-the-dewines-2019/results/661515/formatted/'),
          ms('Mason Invitational', '2019-09-07', '18:13.40', 131, '364349-mason-invitational-2019/results/664261/formatted/'),
          ms('Cedarville Friendship Cross Country Invitational', '2019-09-14', '17:56.40', 88, '364350-cedarville-friendship-cross-country-invitational-2019/results/665640/formatted/'),
          ms('Saturday Night Lights', '2019-09-21', '18:46.20', 221, '364359-saturday-night-lights-2019/results/667956/formatted/'),
          ms('Kings High School Cross Country Invitational', '2019-09-24', '18:22.70', 17, '357692-kings-high-school-cross-country-invitational-2019/results/668737/formatted/?event=m5000mfinalsFinals'),
          ms('Neal Charske Firebird Invitational', '2019-09-28', '18:25.10', 97, '364489-neal-charske-firebird-invitational-2019/results/670443/formatted/'),
          ms('Ed Leas Fall Classic Invitational', '2019-10-05', '17:55.85', 32, '369247-ed-leas-fall-classic-invitational-2019/results/672157/formatted/'),
          ms('ECC XC Championships', '2019-10-12', '18:27.15', 38, '363978-ecc-xc-championships-2019/results/674589/formatted/'),
          ms('OHSAA District Cross Country - West Chester', '2019-10-19', '17:58.99', 51, '369401-ohsaa-district-cross-country-west-chester-2019/results/677029/formatted/'),
          ms('OHSAA Cross Country Regions 4, 8 & 12', '2019-10-26', '19:33.92', 132, '369380-ohsaa-cross-country-regions-4-8-and-12-2019/results/678958/formatted/'),
          ms('Talawanda Invitational', '2020-08-29', '18:17.10', 17, '390294-talawanda-invitational-2020/results'),
          ms('Loveland XC Invitational', '2020-09-05', '18:09.10', 49, '390306-loveland-xc-invitational-2020/results'),
          ms('Mason Cross Country Invite Sponsored by Buckeye Running Company', '2020-09-12', '18:31.70', 60, '390313-mason-cross-country-invite-sponsored-by-buckeye-running-company-2020/results'),
          ms('Milford XC Invitational', '2020-09-19', '17:03.70', 29, '390322-milford-xc-invitational-2020/results'),
          ms('Seven Hills CC Invitational', '2020-09-24', '18:53.50', 10, '390333-seven-hills-cc-invitational-2020/results'),
          ms('Kings XC Invitational', '2020-10-10', '17:52.80', 6, '390349-kings-xc-invitational-2020/results'),
          ms('ECC XC Championships', '2020-10-17', '17:46.00', 37, '391279-ecc-xc-championships-2020/results'),
          ms('Southwest District - Voice of America', '2020-10-24', '17:43.70', 24, '390376-southwest-district-voice-of-america-2020/results'),
          ms('XC Town USA Meet of Champions Presented by the Garrett Companies', '2020-11-15', '19:06.50', 120,
            'https://in.milesplit.com/meets/400358-xc-town-usa-meet-of-champions-presented-by-the-garrett-companies-2020/results/714192?type=formatted'),
        ],
      },
      {
        id: 'hs-3200-in',
        label: '3200m (In)',
        races: [
          ms('Sid Sink High School Open', '2018-01-20', '12:22.85', 18, '292711-sid-sink-high-school-open-2018/results'),
          ms('Cedarville Richey Tune-up', '2018-02-03', '11:57.32', 29, '298462-cedarville-richey-tune-up-2018/results/566238/formatted/'),
          ms('Cedarville Richey Tune-up', '2019-02-02', '11:31.83', 18, '337605-cedarville-richey-tune-up-2019/results/626225/formatted/'),
          ms('Rubber City Open', '2019-02-16', '11:11.40', 53, '339187-rubber-city-open-2019/results'),
          ms('Ohio State University Buckeye High School Qualifier #1', '2020-01-11', '11:22.91', 11, '375056-ohio-state-university-buckeye-high-school-qualifier-1-2020/results'),
          ms('Sid Sink High School Open', '2020-01-18', '11:14.21', 10, '369211-sid-sink-high-school-open-2020/results'),
          ms('Cedarville Richey Tune-up', '2020-02-08', '11:12.17', 15, '381453-cedarville-richey-tune-up-2020/results'),
          ms('Akron Rubber City Open', '2020-02-22', '11:00.56', 51, '375063-akron-rubber-city-open-2020/results'),
          race('Louisville Indoor Games', '2021-02-27', '11:15.69', 48, 'https://www.milesplit.com/meets/406064-louisville-indoor-games-2021/results/719975/formatted/'),
        ],
      },
      {
        id: 'hs-1600-in',
        label: '1600m (In)',
        races: [
          ms('Sid Sink High School Open', '2018-01-20', '5:36.49', 52, '292711-sid-sink-high-school-open-2018/results'),
          ms('Cedarville Richey Tune-up', '2018-02-03', '5:29.52', 150, '298462-cedarville-richey-tune-up-2018/results/566238/formatted/'),
        ],
      },
      {
        id: 'hs-3200-out',
        label: '3200m (O)',
        races: [
          ms('Kings Senior Night Quad', '2018-04-24', '11:28.29', 6, '317060-kings-senior-night-quad-2018/results'),
          ms('Kings Invite', '2018-05-01', '11:19.49', 13, '319010-kings-invite-2018/results'),
          ms('Kings Quad Meet', '2019-04-23', '11:34.54', 7, '356488-kings-quad-meet-2019/results'),
          ms('JV ECC Championships', '2019-05-11', '11:31.19', 9, '360268-jv-ecc-championships-2019/results'),
          ms('Little Miami HS Quad', '2021-04-06', '11:13.40', 4, '412984-little-miami-hs-quad-2021/results'),
          ms('Kings Senior Night Quad', '2021-04-19', '10:51.60', 1, '420947-kings-senior-night-quad-2021/results'),
          ms('Lakota West Invitational', '2021-04-21', '10:45.83', 6, '410179-lakota-west-invitational-2021/results'),
          ms('Kings High School Invitational', '2021-04-27', '10:59.36', 5, '408446-kings-hs-invitational-2021/results'),
          ms('Loveland Invitational', '2021-04-30', '10:48.39', 9, '410218-loveland-invitational-2021/results'),
          ms('Firebird Invitational', '2021-05-06', '10:49.44', 17, '411561-firebird-invitational2-days-2021/results'),
          ms('ECC League Championship', '2021-05-12', '10:49.32', 15, '408587-ecc-league-championship-2021/results'),
          ms('OHSAA Division 1 District - Mason', '2021-05-19', '10:51.92', 19, '426716-ohsaa-division-1-district-mason-2021/results/750607/formatted/'),
        ],
      },
      {
        id: 'hs-1600-out',
        label: '1600m (O)',
        races: [
          ms('Kings High School Senior Night', '2018-04-24', '5:09.09', 9, '317060-kings-senior-night-quad-2018/results'),
          ms('Jack Lintz Northmont Invitational', '2019-03-30', '5:13.90', 14, '348613-jack-lintz-northmont-invitational-2019/results'),
          ms('Kings Quad Meet', '2019-04-23', '5:09.20', 11, '356488-kings-quad-meet-2019/results'),
          ms('Kings High School Invitational', '2019-04-30', '5:01.80', 11, '358128-kings-high-school-invitational-2019/results'),
          ms('JV ECC Championships', '2019-05-11', '4:58.38', 5, '360268-jv-ecc-championships-2019/results'),
        ],
      },
      {
        id: 'hs-2k-steeple',
        label: '2k Steeple (O)',
        races: [ms('Centerville Elk Relays', '2021-04-16', '7:24.71', 13, '409831-centerville-elk-relays-2021/results')],
      },
      {
        id: 'hs-3k-steeple',
        label: '3k Steeple (O)',
        races: [ms('Anderson Invitational', '2021-04-22', '11:19.09', 18, '410255-anderson-invitational2-days-2021/results')],
      },
    ],
  },
  {
    id: 'college',
    label: 'Centre College',
    logo: 'assets/Logos/centre.png',
    events: [
      {
        id: 'col-5k-xc',
        label: '5k (XC)',
        races: [
          tf('5th Annual BC/CC Jamboree', '2021-09-03', '17:35.10', 44, 'xc/17833/5th_Annual_BC_CC_Jamboree'),
          tf('6th Annual BC/CC Jamboree', '2022-09-02', '17:30.70', 32, 'xc/19643/6th_Annual_BC_CC_Jamboree'),
        ],
      },
      {
        id: 'col-6k-xc',
        label: '6k (XC)',
        races: [
          tf('Hanover XC Invitational 2021', '2021-09-11', '22:10.70', 33, 'xc/17806/Hanover_XC_Invitational_2021_'),
          tf('Hanover XC Invitational 2022', '2022-09-10', '21:44.30', 27, 'xc/19414/Hanover_XC_Invitational_2022'),
          tf('7th Annual BC/CC Jamboree', '2023-09-01', '20:26.6', 26, 'xc/21690/7th_Annual_BC_CC_Jamboree'),
        ],
      },
      {
        id: 'col-8k-xc',
        label: '8k (XC)',
        races: [
          tf('2021 MSJ Run with the Lions', '2021-09-17', '30:56.60', 33, 'xc/18310/2021_MSJ_Run_with_the_Lions'),
          tf('Louisville Classic', '2021-10-01', '29:50.50', 292, 'xc/18894/Louisville_Classic'),
          tf('Jenna Strong CC Fall Classic', '2021-10-15', '29:42.50', 183, 'xc/18426/Jenna_Strong_CC_Fall_Classic'),
          tf('Southern Athletic Association Championships', '2021-10-30', '30:11.20', 62, 'xc/18125/Southern_Athletic_Association_Championships'),
          tf('NCAA Division III Great Lakes Region Cross Country Championships', '2021-11-13', '29:31.40', 230, 'xc/18999/NCAA_Division_III_Great_Lakes_Region_Cross_Country_Championships'),
          tf('Rhodes Cross Country Invitational', '2022-09-17', '29:09.10', 61, 'xc/19737/Rhodes_Cross_Country_Invitational'),
          tf('2022 DIII National Preview', '2022-10-01', '29:07.50', 259, 'xc/20425/2022_DIII_National_Preview'),
          tf('Oberlin College Inter-Regional Rumble', '2022-10-15', '27:51.80', 65, 'xc/21050/Oberlin_College_Inter-Regional_Rumble'),
          tf('2022 SAA Cross Country Championships', '2022-10-29', '28:36.40', 39, 'xc/20507/2022_SAA_Cross_Country_Championships'),
          tf('Converse Kick Off', '2023-09-16', '28:00.4', 93, 'xc/21448/Converse_Kick-Off'),
          tf('Live in Lou XC Classic', '2023-09-30', '27:47.1', 312, 'xc/22862/Live_in_Lou_XC_Classic'),
          tf('Augustana Interregional', '2023-10-14', '27:43.8', 333, 'xc/22579/Augustana_Interregional'),
          tf('Southern Athletic Association Championships', '2023-10-28', '27:54.9', 38, 'xc/23136/Southern_Athletic_Association_Championships'),
        ],
      },
      {
        id: 'col-3k-in',
        label: '3k (In)',
        races: [
          tf('Bellarmine Open', '2022-01-21', '9:58.14', 44, '71504/4342962/Bellarmine_Open/Mens-3000-Meters'),
          tf('Wittenberg Collegiate Invite', '2024-02-17', '9:59.71', 42, '82687/5062166/Wittenberg_Collegiate_Invite/Mens-3000-Meters'),
        ],
      },
      {
        id: 'col-5k-in',
        label: '5k (In)',
        races: [
          tf('Wittenberg Invite', '2022-02-19', '17:21.54', 31, '72516/4380928/Wittenberg_Invite/Mens-5000-Meters'),
          tf('Wittenberg Collegiate Invite', '2023-02-18', '16:46.42', 19, '77430/4681082/Wittenberg_Collegiate_Invite/Mens-5000-Meters'),
          tf('Centre College Track & Field Indoor Showcase', '2024-01-20', '16:45.42', 9, '82831/5012578/Centre_College_Track__Field_Indoor_Showcase/Mens-5000-Meters'),
          tf('Centre Indoor Invitational & Multis', '2024-02-10', '16:49.59', 4, '83410/5039580/Centre_Indoor_Invitational__Multis/Mens-5000-Meters'),
        ],
      },
      {
        id: 'col-5k-out',
        label: '5k (O)',
        races: [
          tf('Victor Ice Breaker Duals 2022', '2022-03-05', '17:31.57', 36, '70560/4405228/Victor_Ice_Breaker_Duals_2022/Mens-5000-Meters'),
          tf('Rhodes College Track & Field Invitational', '2022-03-18', '16:56.10', 39, '72792/4425733/Rhodes_College_Track__Field_Invitational/Mens-5000-Meters'),
          tf('Victor Ice Breaker Duals 2023', '2023-03-04', '16:42.33', 51, '75433/4707399/Victor_Ice_Breaker_Duals_2023/Mens-5000-Meters'),
          tf('Gordon Bocock Cumberlands Invitational & Distance Festival', '2023-04-01', '16:20.38', 13, '78276/4799936/Gordon_Bocock_Cumberlands_Invitational__Distance_Festival/Mens-5000-Meters'),
          tf('Rhodes College T & F Invitational', '2024-03-15', '16:16.77', 39, '83809/5113374/Rhodes_College_T__F_Invitational/Mens-5000-Meters'),
          tf('Landon Bond Classic', '2024-04-06', '16:20.30', 3, '81306/5171057/Landon_Bond_Classic/Mens-5000-Meters'),
          tf('Centre College Track & Field Twilight', '2024-04-12', '16:10.13', 5, '85024/5189915/Centre_College_Track__Field_Twilight/Mens-5000-Meters'),
          tf('2024 Southern Athletic Association Outdoor Championships', '2024-04-26', '16:17.04', 10, '84368/5240156/2024_Southern_Athletic_Association_Outdoor_Championships/Mens-5000-Meters'),
        ],
      },
      {
        id: 'col-3k-steeple',
        label: '3k Steeple (O)',
        races: [
          tf('Landon Bond Invitational', '2022-04-02', '11:05.13', 7),
          tf('Berry Field Day Invitational 2022', '2022-04-15', '10:46.19', 7),
          tf('SAA Outdoor Track & Field Championships', '2022-04-29', '10:52.78', 14, '71660/4461263/Landon_Bond_Invitational/Mens-3000-Steeplechase'),
          tf('55th Annual Centre College Track & Field Invitational', '2023-04-01', '10:54.58', 13, '77899/4766655/56th_Annual_Centre_College_Track__Field_Invitational/Mens-3000-Steeplechase'),
          tf('Centre College Track & Field Twilight', '2023-04-14', '10:34.61', 6, '77960/4822246/Centre_College_Track__Field_Twilight/Mens-3000-Steeplechase'),
          tf('SAA Track & Field Championships', '2023-04-28', '10:32.02', 11, '80141/4879875/SAA_Track__Field_Championships/Mens-3000-Steeplechase'),
          tf('56th Annual Centre College Track & Field Invitational', '2024-03-30', '10:27.19', 2, '84391/5148140/56th_Annual_Centre_College_Track__Field_Invitational/Mens-3000-Steeplechase'),
          tf('2024 Southern Athletic Association Outdoor Championships', '2024-04-26', '10:13.27', 9, '84368/5240163/2024_Southern_Athletic_Association_Outdoor_Championships/Mens-3000-Steeplechase'),
        ],
      },
      {
        id: 'col-mile',
        label: 'Mile (O)',
        races: [
          tf('Rhodes College Track & Field Invitational', '2022-03-19', '4:58.12', 25, '72792/4425731/Rhodes_College_Track__Field_Invitational/Mens-Mile'),
          tf('Rhodes College Track & Field Invitational', '2024-03-16', '4:42.78', 36, '83809/5113372/Rhodes_College_T__F_Invitational/Mens-Mile'),
        ],
      },
      {
        id: 'col-800',
        label: '800m (O)',
        races: [
          tf('56th Annual Centre College Track & Field Invitational', '2024-03-30', '2:11.48', 20, '84391/5148114/56th_Annual_Centre_College_Track__Field_Invitational/Mens-800-Meters'),
        ],
      },
    ],
  },
  {
    id: 'unattached',
    label: 'Cincinnatus Elite',
    logo: 'assets/Logos/ce.png',
    events: [
      {
        id: 'un-3k-in',
        label: '3k (In)',
        races: [tf('Centre First Chance Indoors', '2024-12-07', '9:57.24', 13, '87763/5322056/Centre_First_Chance_Indoors/Mens-3000-Meters')],
      },
      {
        id: 'un-8k-xc',
        label: '8k (XC)',
        races: [tf('All Ohio Inter-Collegiate Challenge', '2025-09-19', '28:49.7', 237, 'xc/26294/All-Ohio_InterCollegiate_Challenge')],
      },
      {
        id: 'un-half',
        label: 'Half Marathon',
        races: [race('Flying Pig Half Marathon', '2026-05-01', '1:16:53', 14, 'https://flyingpigmarathon.com/flying-pig-marathon-weekend/results')],
      },
      {
        id: 'un-5k-out',
        label: '5k (O)',
        races: [
          race('Cincinnatus Track Fest', '2025-07-26', '17:18.71', 19, 'https://finishtiming.trackscoreboard.com/meets/72625/events/2036'),
          race('Cincinnatus Track Fest', '2026-08-08', '16:26.48', 8, 'https://finishtiming.trackscoreboard.com/meets/30167269/events/12/Final'),
        ],
      },
      {
        id: 'un-5k-road',
        label: '5k (road)',
        races: [
          race('Heart Mini', '2026-03-15', '17:37', 2,
            'https://onlineraceresults.com/race/view_race.php?race_id=80104&re_NO=e.g.%2C+1946&re_FN=Christopher&re_LN=Dickerson&re_CITY=&re_STATE=&re_DIVISION=&submit_action=select_result&race_id=80104#results'),
        ],
      },
    ],
  },
];