import { useGame } from '../engine/GameContext.jsx';
import Shell from '../components/Shell.jsx';

const STEPS_EN = [
  ['Watch', 'Story scenes play like a series. Tap to read on. Skip any time.'],
  ['Investigate', 'Tap the glowing points in each location. Some hold evidence, some only atmosphere.'],
  ['Question', 'Interview suspects. New questions unlock when you find evidence that contradicts them.'],
  ['Solve', 'Story puzzles unlock phones, ledgers and cameras. Each one teaches you something.'],
  ['Rebuild', 'Put events in the true order on the Timeline. One of the times you were given is a lie.'],
  ['Connect', 'On the Board, tap two items to link them. Correct links reveal what they mean.'],
  ['Accuse', 'Build your theory: who, why, how, when, and your key evidence. Then see the truth.'],
];
const STEPS_AR = [
  ['شاهد', 'تُعرض مشاهد القصة كما في مسلسل. اضغط للمتابعة. تخطَّ في أي وقت.'],
  ['حقّق', 'اضغط النقاط المتوهجة في كل مكان. بعضها يحمل دليلاً، وبعضها مجرد أجواء.'],
  ['استجوب', 'قابل المشتبه بهم. تُفتح أسئلة جديدة عندما تجد دليلاً يناقض روايتهم.'],
  ['حلّ', 'ألغاز القصة تفتح الهواتف والدفاتر والكاميرات. كل واحد يعلّمك شيئاً.'],
  ['أعد البناء', 'رتّب الأحداث بترتيبها الصحيح على الخط الزمني. أحد الأوقات التي أُعطيت لك كذبة.'],
  ['اربط', 'على اللوحة، اضغط عنصرين لربطهما. الروابط الصحيحة تكشف معناها.'],
  ['اتّهم', 'ابنِ نظريتك: من، ولماذا، وكيف، ومتى، ودليلك الرئيسي. ثم شاهد الحقيقة.'],
];
export default function HowToPlay() {
  const { t, lang } = useGame();
  const STEPS = lang === 'ar' ? STEPS_AR : STEPS_EN;
  return (
    <Shell title={t('How to play')} noNav><div className="scroll pad">
      <p className="lead">{lang === 'ar' ? 'أنت المحقق. لن يخبرك أحد بما هو مهم؛ أنت من يقرر.' : 'You are the detective. Nobody will tell you what matters; you decide.'}</p>
      <ol className="howto">{STEPS.map(([h, sub]) => <li key={h}><b>{h}</b><span>{sub}</span></li>)}</ol>
      <p className="muted small">{lang === 'ar' ? 'يُحفظ تقدّمك تلقائياً على هذا الجهاز. لا شيء يغادر متصفحك.' : 'Your progress saves automatically on this device. Nothing leaves your browser.'}</p>
    </div></Shell>
  );
}
