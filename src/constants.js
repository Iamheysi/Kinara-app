// ─── NEW THEME SYSTEM: 5 gym-industrial gammas ───────────────────────────────
// Each theme has: design keys + legacy aliases for untouched components

function buildTheme(t){
  return{
    ...t,
    // Legacy aliases for untouched components (Calendar, Profile, Settings, etc.)
    textPrimary:t.text, textSecondary:t.textDim, textMuted:t.textMute,
    primaryLight:t.primary, primaryDim:`rgba(${hexToRgb(t.primary)},0.12)`,
    white:t.surface, inputBg:t.card, drawerBg:t.card,
    gold:t.warn, purple:t.textDim,
    success:t.success, successDim:`rgba(${hexToRgb(t.success)},0.12)`,
    panelHero:t.heroGlow, panelRest:t.heroGlow, grain:"",
    borderMid:t.borderMid,
  };
}
function hexToRgb(hex){
  const h=hex.replace('#','');const n=h.length===3?h.split('').map(x=>x+x).join(''):h;
  return`${parseInt(n.substr(0,2),16)},${parseInt(n.substr(2,2),16)},${parseInt(n.substr(4,2),16)}`;
}

const _RAW={id:"raw",name:"RAW",
  bg:"#0A0A0A",surface:"#0F0F0F",card:"#141414",cardAlt:"#1A1A1A",
  border:"#1F1F1F",borderMid:"#2A2A2A",borderHi:"#3A3A3A",
  primary:"#E8FF00",primaryInk:"#0A0A0A",
  text:"#F5F5F5",textDim:"#A8A8A8",textMute:"#5A5A5A",
  success:"#00E676",warn:"#FFB300",danger:"#FF3D3D",
  gridLine:"rgba(255,255,255,0.04)",
  heroGlow:"radial-gradient(ellipse at 85% 40%,rgba(232,255,0,0.15),transparent 55%)",
  fontDisp:"'Archivo','Inter',sans-serif",fontMono:"'JetBrains Mono',monospace",fontBody:"'Archivo','Inter',sans-serif",
};
const _BLEED={id:"bleed",name:"BLEED",
  bg:"#F2EEE4",surface:"#FFFFFF",card:"#FAF6EC",cardAlt:"#FFFFFF",
  border:"#1A1A1A",borderMid:"#2A2A2A",borderHi:"#0A0A0A",
  primary:"#E8352B",primaryInk:"#FFFFFF",
  text:"#0A0A0A",textDim:"#444444",textMute:"#888888",
  success:"#1E7E34",warn:"#B47E00",danger:"#D32F2F",
  gridLine:"rgba(10,10,10,0.08)",
  heroGlow:"radial-gradient(ellipse at 85% 40%,rgba(232,53,43,0.08),transparent 55%)",
  fontDisp:"'Archivo','Inter',sans-serif",fontMono:"'JetBrains Mono',monospace",fontBody:"'Archivo','Inter',sans-serif",
};
const _FOREST={id:"forest",name:"FOREST",
  bg:"#EDEAE0",surface:"#F6F3E9",card:"#FFFCF2",cardAlt:"#F0EDE0",
  border:"#1C2920",borderMid:"#2E3A30",borderHi:"#0E1812",
  primary:"#1F6B3E",primaryInk:"#F6F3E9",
  text:"#0E1812",textDim:"#3A4A40",textMute:"#7C8A80",
  success:"#1F6B3E",warn:"#B07A1F",danger:"#A83226",
  gridLine:"rgba(14,24,18,0.08)",
  heroGlow:"radial-gradient(ellipse at 85% 40%,rgba(31,107,62,0.12),transparent 55%)",
  fontDisp:"'Archivo','Inter',sans-serif",fontMono:"'JetBrains Mono',monospace",fontBody:"'Archivo','Inter',sans-serif",
};
const _COBALT={id:"cobalt",name:"COBALT",
  bg:"#07080C",surface:"#0D1018",card:"#12171F",cardAlt:"#171D27",
  border:"#1D2432",borderMid:"#2A3244",borderHi:"#3D475E",
  primary:"#2F6FFF",primaryInk:"#F0F4FF",
  text:"#EDF1F8",textDim:"#A4B0C8",textMute:"#5A6680",
  success:"#22D3A1",warn:"#FFB340",danger:"#FF4D6A",
  gridLine:"rgba(175,195,230,0.05)",
  heroGlow:"radial-gradient(ellipse at 85% 40%,rgba(47,111,255,0.22),transparent 55%)",
  fontDisp:"'Archivo','Inter',sans-serif",fontMono:"'JetBrains Mono',monospace",fontBody:"'Archivo','Inter',sans-serif",
};
const _STEEL={id:"steel",name:"STEEL",
  bg:"#E8E6E0",surface:"#F3F1EB",card:"#FBFAF5",cardAlt:"#EDEBE4",
  border:"#2A2A2A",borderMid:"#3A3A3A",borderHi:"#1A1A1A",
  primary:"#D94A1F",primaryInk:"#FBFAF5",
  text:"#1A1A1A",textDim:"#4A4A4A",textMute:"#8A8A8A",
  success:"#2E7D32",warn:"#B77A00",danger:"#C62828",
  gridLine:"rgba(26,26,26,0.08)",
  heroGlow:"radial-gradient(ellipse at 85% 40%,rgba(217,74,31,0.1),transparent 55%)",
  fontDisp:"'Archivo','Inter',sans-serif",fontMono:"'JetBrains Mono',monospace",fontBody:"'Archivo','Inter',sans-serif",
};

export const THEMES={
  raw:buildTheme(_RAW), bleed:buildTheme(_BLEED), forest:buildTheme(_FOREST),
  cobalt:buildTheme(_COBALT), steel:buildTheme(_STEEL),
};
export const THEME_ORDER=["raw","bleed","forest","cobalt","steel"];

// Legacy exports (for backwards compat — point to nearest equivalents)
export const DARK=THEMES.cobalt;
export const LIGHT=THEMES.steel;

// ─── XP ENGINE ────────────────────────────────────────────────────────────────
export const XP_LEVELS=[
  {lvl:1,name:"INITIATE",xpReq:0,unlock:"BASE PROTOCOLS"},
  {lvl:2,name:"ROOKIE",xpReq:500,unlock:"TIMER THEMES · 2"},
  {lvl:3,name:"GRINDER",xpReq:1400,unlock:"+3 PROTOCOLS"},
  {lvl:4,name:"BRUISER",xpReq:3000,unlock:"PROFILE BADGE · BRONZE"},
  {lvl:5,name:"BEAST",xpReq:5500,unlock:"DARK MODE VARIANTS"},
  {lvl:6,name:"PREDATOR",xpReq:9000,unlock:"+CUSTOM PLANS"},
  {lvl:7,name:"SAVAGE",xpReq:14000,unlock:"PROFILE BADGE · SILVER"},
  {lvl:8,name:"WARMACHINE",xpReq:21000,unlock:"ADVANCED PROTOCOLS"},
  {lvl:9,name:"APEX",xpReq:30000,unlock:"BRUTAL TIER UNLOCKED"},
  {lvl:10,name:"TITAN",xpReq:42000,unlock:"PROFILE BADGE · GOLD"},
  {lvl:11,name:"WARLORD",xpReq:58000,unlock:"LEADERBOARD CROWN"},
  {lvl:12,name:"MYTHIC",xpReq:80000,unlock:"MYTHIC SKIN · ALL THEMES"},
];
export const getLevel=(totalXp)=>{
  let cur=XP_LEVELS[0],next=XP_LEVELS[1];
  for(let i=0;i<XP_LEVELS.length;i++){
    if(totalXp>=XP_LEVELS[i].xpReq){cur=XP_LEVELS[i];next=XP_LEVELS[i+1]||XP_LEVELS[i];}
  }
  const prog=next===cur?1:(totalXp-cur.xpReq)/(next.xpReq-cur.xpReq);
  return{...cur,next,progress:Math.min(1,prog),xpToNext:Math.max(0,next.xpReq-totalXp)};
};
export const getPlanXpReward=(plan)=>{
  if(plan.xpReward)return plan.xpReward;
  return plan.exercises.reduce((a,e)=>a+(e.sets||3)*25,0);
};
export const calcSessionXp=(plan,{complete=1.0,perfectForm=true,noSkips=true,newPR=false,streak=0}={})=>{
  const base=Math.round(getPlanXpReward(plan)*complete);
  const bonuses=[];
  if(perfectForm)bonuses.push({label:"PERFECT FORM",xp:Math.round(getPlanXpReward(plan)*0.10)});
  if(noSkips)bonuses.push({label:"NO SKIPS",xp:Math.round(getPlanXpReward(plan)*0.08)});
  if(newPR)bonuses.push({label:"NEW PR",xp:150});
  if(streak>=7)bonuses.push({label:`${streak}-DAY STREAK`,xp:50+Math.min(streak,30)*5});
  return{base,bonuses,total:base+bonuses.reduce((a,b)=>a+b.xp,0)};
};

export const MUSCLE_GROUP_COLORS={
dark:{
'warm-up':{accent:'#E8734A',dim:'rgba(232,115,74,0.12)',border:'rgba(232,115,74,0.3)'},
chest:{accent:'#C4564A',dim:'rgba(196,86,74,0.12)',border:'rgba(196,86,74,0.3)'},
back:{accent:'#6A6AC4',dim:'rgba(106,106,196,0.12)',border:'rgba(106,106,196,0.3)'},
shoulders:{accent:'#C46A8A',dim:'rgba(196,106,138,0.12)',border:'rgba(196,106,138,0.3)'},
triceps:{accent:'#CCAD55',dim:'rgba(204,173,85,0.12)',border:'rgba(204,173,85,0.3)'},
biceps:{accent:'#55B8B0',dim:'rgba(85,184,176,0.12)',border:'rgba(85,184,176,0.3)'},
legs:{accent:'#C44A4A',dim:'rgba(196,74,74,0.12)',border:'rgba(196,74,74,0.3)'},
glutes:{accent:'#C44A6A',dim:'rgba(196,74,106,0.12)',border:'rgba(196,74,106,0.3)'},
core:{accent:'#5A8A5A',dim:'rgba(90,138,90,0.12)',border:'rgba(90,138,90,0.3)'},
general:{accent:'#C4826A',dim:'rgba(196,130,106,0.12)',border:'rgba(196,130,106,0.3)'},
},
light:{
'warm-up':{accent:'#D4612E',dim:'rgba(212,97,46,0.08)',border:'rgba(212,97,46,0.25)'},
chest:{accent:'#B0443A',dim:'rgba(176,68,58,0.08)',border:'rgba(176,68,58,0.25)'},
back:{accent:'#4848A8',dim:'rgba(72,72,168,0.08)',border:'rgba(72,72,168,0.25)'},
shoulders:{accent:'#A8486A',dim:'rgba(168,72,106,0.08)',border:'rgba(168,72,106,0.25)'},
triceps:{accent:'#9A6E0A',dim:'rgba(154,110,10,0.08)',border:'rgba(154,110,10,0.25)'},
biceps:{accent:'#2A8A82',dim:'rgba(42,138,130,0.08)',border:'rgba(42,138,130,0.25)'},
legs:{accent:'#A83838',dim:'rgba(168,56,56,0.08)',border:'rgba(168,56,56,0.25)'},
glutes:{accent:'#A83858',dim:'rgba(168,56,88,0.08)',border:'rgba(168,56,88,0.25)'},
core:{accent:'#2E6E45',dim:'rgba(46,110,69,0.08)',border:'rgba(46,110,69,0.25)'},
general:{accent:'#2B55CC',dim:'rgba(43,85,204,0.07)',border:'rgba(43,85,204,0.25)'},
}};
export const MUSCLE_GROUP_EMOJI={'warm-up':'🔥',chest:'🔥',back:'💪',shoulders:'🎯',triceps:'⚡',biceps:'💪',legs:'🦵',glutes:'🍑',core:'🧱',general:'🏋️'};

export const TR={en:{dashboard:"Dashboard",plans:"Plans",logWorkout:"Log Workout",restDay:"Rest Day",calendar:"Calendar",progress:"Progress",profile:"Profile",settings:"Settings",goodMorning:"Good Morning",goodAfternoon:"Good Afternoon",goodEvening:"Good Evening",currentStreak:"Current Streak",totalWorkouts:"Total Workouts",personalRecords:"Personal Records",restDays:"Rest Days",days:"days",allTime:"all time",set:"set",logged:"logged",quickStart:"Quick Start",logWorkoutBtn:"LOG WORKOUT",logRestDay:"Log Rest Day",thisWeek:"This Week",upNext:"Up Next",recentActivity:"Recent Activity",startWorkout:"START",editPlan:"Edit",newPlan:"+ New Plan",trainingPlans:"Training Plans",myPlans:"My",warmup:"Warm-up",addExercise:"+ Add",backToPlans:"← Back",activeSession:"Active Session",overallProgress:"Overall Progress",restTimer:"Rest Timer",skip:"Skip",finishWorkout:"FINISH WORKOUT",setsLabel:"sets",repsLabel:"reps",kgLabel:"kg",noActivityToday:"No activity today —",restStreakNote:"rest days protect your streak too.",dismiss:"Dismiss",recoveryInsight:"Recovery Insight",loggedState:"Rest Day Logged",streakSafe:"Streak protected. See you tomorrow.",activityCalendar:"Activity Calendar",workout:"Workout",rest:"Rest",progressAnalytics:"Progress & Analytics",overview:"Overview",strength:"Strength",trainingLoad:"Training Load",mostTrained:"Most Trained",personalRecordsTitle:"Personal Records",workoutsPerWeek:"Workouts / Week",volumePerWeek:"Volume / Week (kg)",last12Weeks:"Last 12 weeks",newPR:"NEW PERSONAL RECORD",celebrate:"CELEBRATE →",exportData:"Export Data",importData:"Import Data",theme:"Theme",language:"Language",dark:"Dark",light:"Light",english:"English",russian:"Русский",noWorkoutsYet:"No workouts logged yet",startFirst:"Log your first workout to see stats.",selectDayDetail:"Select a day to view details",selectPlan:"Select a plan to start",exercises:"exercises",woSession:"Workout saved!",noStreak:"Log workouts to build a streak",allDataLocal:"Kinara v0.7.2 · Data saved locally",targetReached:"TARGET REACHED",minShort:"min",doneBtn:"Done",yes:"Yes",no:"No",recoveryPctLabel:"Recovery %",importOk:"Data imported!",importFail:"Invalid file.",deleteSession:"Delete Session",cancelWorkout:"Cancel",appSettings:"App Settings",reminders:"Reminders",helpSupport:"Help & Support",account:"Account",saveProfile:"Save",restBlockedMsg:"You've logged a rest day today.",restBlockedSub:"Come back tomorrow to train!",workoutBlockedMsg:"Already worked out today!",workoutBlockedSub:"Rest up and recover — see you tomorrow.",workoutActiveMsg:"You have an active session!",workoutActiveSub:"Finish your workout before logging a rest day.",undoRest:"Undo Rest Day",appearance:"Appearance",data:"Data",bio:"Bio",goal:"Training Goal",uploadPhoto:"Upload Photo",achievements:"Achievements",consistency:"Consistency",avgIntensity:"Avg Intensity",kgPerMin:"kg / min",noData:"Not enough data yet",goalStrength:"Strength",goalHypertrophy:"Hypertrophy",goalFatLoss:"Fat Loss",goalEndurance:"Endurance",goalGeneral:"General Fitness",profileTitle:"My Profile",editProfile:"Edit Profile",doneEditing:"Done",pause:"Pause",resume:"Resume",weeklySchedule:"Weekly Schedule",free:"Free",seeWeek:"See Week",collapse:"Collapse",editSchedule:"Edit Schedule",doneSched:"Done",deletePlan:"Delete Plan",confirmDelete:"Delete?",intensityInfo:"Avg volume (kg) per minute of workout time.",streakInfo:"Consecutive days you honored your schedule. Scheduled workout days require a workout or rest log. Free days and scheduled rest days auto-count. Miss a scheduled workout and the streak resets.",volumeInfo:"Sum of weight × reps for every completed set.",prInfo:"Highest weight ever lifted per exercise, auto-detected when finishing a workout.",atlInfo:"Acute Training Load — 7-day EWA (τ=7). Represents recent accumulated fatigue.",ctlInfo:"Chronic Training Load — 42-day EWA (τ=42). Represents your long-term fitness base.",tsbInfo:"Training Stress Balance = CTL − ATL. Positive: fresh. Negative: fatigued. Ideal: +5 to +25.",plateauInfo:"Compares max weight last 21 days vs previous 21 days.",oneRmInfo:"Brzycki formula: 1RM = weight × 36 / (37 − reps). Most accurate for 4–10 rep sets.",consistencyInfo:"% of the last 8 weeks in which you logged at least one workout.",streakHomeInfo:"Consecutive days you honored your schedule. Miss a scheduled workout without logging anything and it resets.",totalWorkoutsInfo:"Total completed workout sessions logged.",prsHomeInfo:"Number of exercises where you've set a personal weight record.",restDaysInfo:"Total rest days logged. Rest days count toward your streak.",totalVolLabel:"Total Volume",last8wks:"last 8 wks",activityLast12:"Activity — Last 12 Weeks",topExercises:"Top Exercises",addNotes:"Add notes (e.g., Shoulders, chest, triceps)…",chooseImage:"Choose Card Image",removeImage:"Remove Image",privacyPolicy:"Privacy Policy",termsOfService:"Terms of Service",setOfLabel:"Set",ofLabel:"of",skipRestBtn:"Skip Rest",restLabel:"REST",instructionLabel:"Instructions",muscleGroupsLabel:"Muscle Groups",doneLabel:"DONE",planHelpAria:"How to customize plans",planHelpHowTo:"How it works",planHelpTitle:"How to customize this plan",planHelpMuscleGroups:"Muscle Groups — tap to choose which groups this plan targets. Selected groups appear in each exercise's Group dropdown and color-code the exercise rows.",planHelpExerciseName:"Exercise name — type a name and press Enter or + to add it to the plan.",planHelpGroup:"Group — assign each exercise to one of the plan's muscle groups (or General). Drives color-coding and progress tracking.",planHelpSetsReps:"Sets / Reps / Rest(s) — number of working sets, reps per set, and seconds of rest between sets. Rest is used by the rest timer during a workout.",planHelpSave:"Press Save (top right) to keep changes, then ▶ Start Workout to begin a logged session."},
ru:{dashboard:"Главная",plans:"Планы",logWorkout:"Тренировка",restDay:"Отдых",calendar:"Календарь",progress:"Прогресс",profile:"Профиль",settings:"Настройки",goodMorning:"Доброе утро",goodAfternoon:"Добрый день",goodEvening:"Добрый вечер",currentStreak:"Серия дней",totalWorkouts:"Тренировки",personalRecords:"Рекорды",restDays:"Дни отдыха",days:"дн.",allTime:"всего",set:"уст.",logged:"записано",quickStart:"Быстрый старт",logWorkoutBtn:"ТРЕНИРОВКА",logRestDay:"День отдыха",thisWeek:"Эта неделя",upNext:"Далее",recentActivity:"Последняя активность",startWorkout:"СТАРТ",editPlan:"Изменить",newPlan:"+ Новый план",trainingPlans:"Тренировочные планы",myPlans:"Мои",warmup:"Разминка",addExercise:"+ Добавить",backToPlans:"← Назад",activeSession:"Активная сессия",overallProgress:"Общий прогресс",restTimer:"Таймер отдыха",skip:"Пропустить",finishWorkout:"ЗАВЕРШИТЬ",setsLabel:"подх.",repsLabel:"повт.",kgLabel:"кг",noActivityToday:"Сегодня нет активности —",restStreakNote:"дни отдыха тоже засчитываются в серию.",dismiss:"Скрыть",recoveryInsight:"Совет по восстановлению",loggedState:"День отдыха записан",streakSafe:"Серия защищена. До завтра!",activityCalendar:"Календарь активности",workout:"Тренировка",rest:"Отдых",progressAnalytics:"Прогресс и аналитика",overview:"Обзор",strength:"Сила",trainingLoad:"Нагрузка",mostTrained:"Частые упражнения",personalRecordsTitle:"Личные рекорды",workoutsPerWeek:"Тренировок / нед.",volumePerWeek:"Объём / нед. (кг)",last12Weeks:"за 12 недель",newPR:"НОВЫЙ РЕКОРД",celebrate:"ОТЛИЧНО →",exportData:"Экспорт данных",importData:"Импорт данных",theme:"Тема",language:"Язык",dark:"Тёмная",light:"Светлая",english:"English",russian:"Русский",noWorkoutsYet:"Тренировок пока нет",startFirst:"Запишите первую тренировку, чтобы увидеть статистику.",selectDayDetail:"Выберите день для подробностей",selectPlan:"Выберите план для старта",exercises:"упражнений",woSession:"Тренировка сохранена!",noStreak:"Тренируйтесь, чтобы начать серию",allDataLocal:"Kinara v0.7.2 · Данные сохранены локально",targetReached:"ЦЕЛЬ ДОСТИГНУТА",minShort:"мин",doneBtn:"Готово",yes:"Да",no:"Нет",recoveryPctLabel:"Восстановление",importOk:"Данные импортированы!",importFail:"Неверный файл.",deleteSession:"Удалить сессию",cancelWorkout:"Отмена",appSettings:"Настройки приложения",reminders:"Напоминания",helpSupport:"Помощь и поддержка",account:"Аккаунт",saveProfile:"Сохранить",restBlockedMsg:"Сегодня записан день отдыха.",restBlockedSub:"Возвращайтесь завтра!",workoutBlockedMsg:"Вы уже тренировались сегодня!",workoutBlockedSub:"Отдохните и восстановитесь — до завтра.",workoutActiveMsg:"Идёт активная тренировка!",workoutActiveSub:"Завершите тренировку перед записью дня отдыха.",undoRest:"Отменить отдых",appearance:"Внешний вид",data:"Данные",bio:"О себе",goal:"Тренировочная цель",uploadPhoto:"Загрузить фото",achievements:"Достижения",consistency:"Регулярность",avgIntensity:"Ср. интенсивность",kgPerMin:"кг / мин",noData:"Недостаточно данных",goalStrength:"Сила",goalHypertrophy:"Гипертрофия",goalFatLoss:"Жиросжигание",goalEndurance:"Выносливость",goalGeneral:"Общая форма",profileTitle:"Мой профиль",editProfile:"Редактировать",doneEditing:"Готово",pause:"Пауза",resume:"Продолжить",weeklySchedule:"Расписание на неделю",free:"Свободно",seeWeek:"Показать неделю",collapse:"Свернуть",editSchedule:"Изменить расписание",doneSched:"Готово",deletePlan:"Удалить план",confirmDelete:"Удалить?",intensityInfo:"Средний объём (кг) в минуту тренировки.",streakInfo:"Подряд идущие дни, когда вы следовали расписанию. В тренировочные дни нужна запись тренировки или дня отдыха. Свободные и запланированные дни отдыха засчитываются автоматически. Пропуск запланированной тренировки сбрасывает стрик.",volumeInfo:"Сумма вес × повторения для каждого завершённого подхода.",prInfo:"Максимальный вес по упражнению, определяется автоматически при завершении тренировки.",atlInfo:"Острая тренировочная нагрузка — экспоненциальное скользящее среднее за 7 дней (τ=7). Отражает накопленную усталость.",ctlInfo:"Хроническая тренировочная нагрузка — ЭСС за 42 дня (τ=42). Отражает вашу фитнес-базу.",tsbInfo:"Баланс тренировочного стресса = CTL − ATL. Положительный: свежий. Отрицательный: утомлённый. Идеал: +5…+25.",plateauInfo:"Сравнивает макс. вес за последние 21 день с предыдущими 21 днями.",oneRmInfo:"Формула Бжицки: 1ПМ = вес × 36 / (37 − повторения). Точнее всего для подходов на 4–10 повторений.",consistencyInfo:"Процент недель с хотя бы одной тренировкой за последние 8 недель.",streakHomeInfo:"Подряд идущие дни, когда вы следовали расписанию. Пропуск тренировки без записи сбрасывает стрик.",totalWorkoutsInfo:"Общее количество завершённых тренировочных сессий.",prsHomeInfo:"Количество упражнений, в которых установлен личный рекорд по весу.",restDaysInfo:"Общее количество дней отдыха. Дни отдыха засчитываются в серию.",totalVolLabel:"Общий объём",last8wks:"за 8 нед.",activityLast12:"Активность — 12 недель",topExercises:"Лучшие упражнения",addNotes:"Заметки (напр., Плечи, грудь, трицепс)…",chooseImage:"Выбрать изображение",removeImage:"Удалить изображение",privacyPolicy:"Политика конфиденциальности",termsOfService:"Условия использования",setOfLabel:"Подход",ofLabel:"из",skipRestBtn:"Пропустить отдых",restLabel:"ОТДЫХ",instructionLabel:"Инструкция",muscleGroupsLabel:"Группы мышц",doneLabel:"ГОТОВО",planHelpAria:"Как настраивать планы",planHelpHowTo:"Как это работает",planHelpTitle:"Как настроить этот план",planHelpMuscleGroups:"Группы мышц — выберите, на какие группы рассчитан план. Выбранные группы появятся в выпадающем списке упражнений и подсветят строки.",planHelpExerciseName:"Название упражнения — введите название и нажмите Enter или +, чтобы добавить его в план.",planHelpGroup:"Группа — назначьте каждое упражнение одной из групп мышц (или «General»). Влияет на цвет и учёт прогресса.",planHelpSetsReps:"Подходы / Повторы / Отдых(с) — количество рабочих подходов, повторов в подходе и секунд отдыха между подходами. Отдых используется таймером во время тренировки.",planHelpSave:"Нажмите «Сохранить» (вверху справа), затем ▶ «Старт», чтобы начать запись тренировки."}};

export const DEFAULT_PLANS=[{id:1,name:"PUSH PROTOCOL",code:"PSH",panel:"push",accent:"clay",difficulty:"ADVANCED",xpReward:840,warmup:{enabled:true,duration:300},notes:"Chest, shoulders, triceps",tag:"CHEST · SHOULDERS · TRICEPS",muscleGroups:["chest","shoulders","triceps"],exercises:[
{id:1,name:"Bench Press",muscleGroup:"chest",instruction:"Lie on a flat bench, grip barbell slightly wider than shoulders. Lower bar to mid-chest with control, press up to full extension. Keep shoulder blades pinched and feet flat on the floor.",sets:4,reps:8,rest:90},
{id:2,name:"Incline DB Press",muscleGroup:"chest",instruction:"Set bench to 30-45 degrees. Press dumbbells up from chest level to full arm extension. Lower with control, keeping elbows at roughly 45 degrees from your torso.",sets:3,reps:12,rest:60},
{id:3,name:"Overhead Press",muscleGroup:"shoulders",instruction:"Stand with feet shoulder-width apart. Press barbell from front-rack position overhead to full lockout. Brace your core and avoid excessive back lean.",sets:4,reps:6,rest:90},
{id:4,name:"Lateral Raises",muscleGroup:"shoulders",instruction:"Stand with dumbbells at sides. Raise arms out to sides until parallel with floor, slight bend in elbows. Control the descent — don't swing.",sets:3,reps:15,rest:45},
{id:5,name:"Tricep Pushdowns",muscleGroup:"triceps",instruction:"Face cable machine, grip bar with overhand grip. Extend arms downward keeping elbows pinned to sides. Squeeze triceps at the bottom, return slowly.",sets:3,reps:12,rest:45}
]},{id:2,name:"PULL PROTOCOL",code:"PUL",panel:"pull",accent:"purple",difficulty:"INTERMEDIATE",xpReward:780,warmup:{enabled:true,duration:240},notes:"Back, biceps, rear delts",tag:"BACK · BICEPS · REAR DELT",muscleGroups:["back","biceps","shoulders"],exercises:[
{id:1,name:"Deadlift",muscleGroup:"back",instruction:"Stand with feet hip-width, bar over mid-foot. Hinge at hips, grip bar just outside knees. Drive through the floor, keeping bar close to your body. Lock out hips and knees together.",sets:4,reps:5,rest:180},
{id:2,name:"Pull-ups",muscleGroup:"back",instruction:"Hang from bar with overhand grip, slightly wider than shoulders. Pull up until chin clears the bar. Lower with control to full arm extension. Use a band for assistance if needed.",sets:4,reps:8,rest:90},
{id:3,name:"Barbell Row",muscleGroup:"back",instruction:"Hinge forward at hips, back flat, grip barbell shoulder-width. Pull bar to lower chest, squeezing shoulder blades together. Lower with control.",sets:3,reps:8,rest:90},
{id:4,name:"Face Pulls",muscleGroup:"shoulders",instruction:"Set cable at face height with rope attachment. Pull toward face, separating the rope ends past your ears. Squeeze rear delts at the end position.",sets:3,reps:15,rest:45},
{id:5,name:"Dumbbell Curl",muscleGroup:"biceps",instruction:"Stand with dumbbells at sides, palms facing forward. Curl weights up while keeping elbows pinned to your sides. Lower slowly with full control.",sets:3,reps:12,rest:45}
]},{id:3,name:"LEG ASSAULT",code:"LEG",panel:"legs",accent:"red",difficulty:"BRUTAL",xpReward:980,warmup:{enabled:true,duration:360},notes:"Quads, hamstrings, glutes, calves",tag:"QUADS · GLUTES · HAMS",muscleGroups:["legs","glutes","core"],exercises:[
{id:1,name:"Squat",muscleGroup:"legs",instruction:"Stand with feet shoulder-width, bar on upper traps. Descend by pushing hips back and bending knees until thighs are parallel. Drive up through your whole foot.",sets:4,reps:6,rest:180},
{id:2,name:"Romanian Deadlift",muscleGroup:"legs",instruction:"Hold barbell at hip height, slight knee bend. Hinge at hips pushing them back, lowering the bar along your legs until you feel a deep hamstring stretch. Reverse the movement.",sets:3,reps:10,rest:90},
{id:3,name:"Leg Press",muscleGroup:"legs",instruction:"Sit in the machine with feet shoulder-width on the platform. Lower the sled by bending knees to 90 degrees, then press back up without locking knees.",sets:3,reps:12,rest:90},
{id:4,name:"Leg Curl",muscleGroup:"legs",instruction:"Lie face down on the machine, pad behind ankles. Curl your heels toward glutes, squeeze hamstrings at the top. Lower slowly.",sets:3,reps:12,rest:60},
{id:5,name:"Calf Raises",muscleGroup:"legs",instruction:"Stand on a raised surface with heels hanging off the edge. Rise onto the balls of your feet, squeezing calves at the top. Lower slowly below the platform for a full stretch.",sets:4,reps:15,rest:45}
]}];
export const DEFAULT_SCHEDULE={0:null,1:1,2:null,3:2,4:null,5:3,6:null};
export const RECOVERY_FACTS=["Muscles grow during rest, not during training. Sleep is your best performance tool.","Recovery days reduce injury risk by up to 50% in strength athletes.","Your nervous system needs 48–72 h to fully recover after intense training.","Protein synthesis peaks 24–48 h after a session. Eat enough protein on rest days."];
export const QUOTES=["Every rep is a vote for the person you want to become.","Discipline is choosing between what you want now and what you want most.","The only bad workout is the one that didn't happen.","You don't have to be extreme, just consistent."];
