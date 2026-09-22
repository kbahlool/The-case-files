// Cinematic scenes. Beat: {set,image,camera:{from,to},fx:[rain,fog,siren,dust,grain],speaker,text,center,char,sfx,ambient,music,hold,flash,overlay,title,sub,grants}
// `set` selects a procedural placeholder; `image` (in /assets/case001/scenes/) replaces it automatically when the file exists.
const Z = (s0, s1, x0 = 0, x1 = 0, y0 = 0, y1 = 0) => ({ from: { s: s0, x: x0, y: y0 }, to: { s: s1, x: x1, y: y1 } });
const N = 'NARRATOR';

export const scenes = {
  intro: { beats: [
    { set:'black', hold:2200, ambient:'rain', fx:['grain'] },
    { set:'city', image:'city.webp', camera:Z(1.05,1.22,0,-2,2,-1), fx:['rain','fog','grain'], speaker:N, text:'Ravenmoor. A Tuesday in November. Rain since dusk.', music:'drone' },
    { set:'city', camera:Z(1.1,1.3,-2,2,0,-3), fx:['rain','fog','grain'], speaker:N, text:'A million lit windows. Every one of them a story someone is not telling.' },
    { set:'street', image:'street.webp', camera:Z(1.0,1.35,0,-6,0,-4), fx:['rain','grain'], speaker:N, text:'Harrow Street, number fourteen. Vale & Sons, Horologists, since 1887.' },
    { set:'clock', camera:Z(1.0,1.5), fx:['dust','grain'], speaker:N, text:'Later, everyone in Ravenmoor would agree on the time.' },
    { set:'clock', camera:Z(1.5,1.7), fx:['dust','grain'], center:true, text:'11:47 PM.', sfx:'tension' },
    { set:'phone', camera:Z(1.0,1.25), fx:['grain'], speaker:N, text:'Across town, a phone lit up in a taxi.' },
    { set:'phone', camera:Z(1.25,1.35), fx:['grain'], overlay:{ kind:'sms', from:'DAD', text:'Regrettably, I must cancel breakfast. I will be working late. Please do not wait up.' }, sfx:'notification' },
    { set:'phone', camera:Z(1.35,1.45), fx:['grain'], speaker:N, text:'The words were polite. The words were wrong.' },
    { set:'alley', image:'alley.webp', camera:Z(1.0,1.3,0,-4,0,0), fx:['rain','grain'], speaker:N, text:'12:07 AM. The side door was unlocked.', sfx:'door' },
    { set:'workshop', image:'workshop.webp', camera:Z(1.0,1.25,0,-3,0,-2), fx:['dust','grain'], speaker:'MARIANNE', text:'Dad? It is freezing in here. Dad?', sfx:'footsteps', char:{ id:'marianne', side:'left' } },
    { set:'workshop', camera:Z(1.2,1.5,-3,2,-2,-3), fx:['dust','grain'], speaker:N, text:'Two hundred clocks were ticking in the dark. All of them, except one.' },
    { set:'workshop', camera:Z(1.5,1.7), fx:['dust','grain'], speaker:'MARIANNE', text:'Dad! Dad, no—', flash:true, sfx:'reveal' },
    { set:'black', hold:1600 },
    { set:'street', camera:Z(1.0,1.2,0,-3,0,-2), fx:['rain','siren','grain'], speaker:N, text:'12:31 AM. Ravenmoor Homicide.', sfx:'transition' },
    { set:'street', camera:Z(1.2,1.3), fx:['rain','siren','grain'], title:'THE LAST CLOCK', sub:'CASE 001', hold:3800 },
    { set:'workshop', camera:Z(1.05,1.2,2,-2,0,0), fx:['dust','grain'], speaker:'INSPECTOR ROURKE', text:'Detective. Thanks for coming out in this.', char:{ id:'rourke', side:'right' } },
    { set:'workshop', fx:['dust','grain'], speaker:'INSPECTOR ROURKE', text:'Edmund Vale, sixty-one. Master clockmaker. Someone hit him from behind. His daughter found him just after midnight.', char:{ id:'rourke', side:'right' } },
    { set:'workshop', fx:['dust','grain'], speaker:'INSPECTOR ROURKE', text:'The wall clock over the bench stopped at 11:47. Nobody outside this room knows that. Not the press. Not the family. Not the suspects. It stays that way.', char:{ id:'rourke', side:'right' }, grants:['E24'] },
    { set:'workshop', fx:['dust','grain'], speaker:'INSPECTOR ROURKE', text:'Four people were close to Vale tonight. Each of them will tell you something that is not true. Start with the scene. Then the people.', char:{ id:'rourke', side:'right' } },
    { set:'workshop', camera:Z(1.1,1.3), fx:['dust','grain'], speaker:N, text:'Find out who is lying. Then find out why.' },
  ] },

  loc_office: { beats: [
    { set:'office', image:'office.webp', camera:Z(1.0,1.2,0,-3,0,0), fx:['dust','grain'], speaker:N, text:'Upstairs, Edmund’s office smelled of pipe smoke and old paper.', sfx:'footsteps' },
    { set:'office', camera:Z(1.2,1.35), fx:['dust','grain'], speaker:N, text:'A man’s life, filed in drawers. Most of it harmless. Some of it not.' },
  ] },
  loc_alley: { beats: [
    { set:'alley', camera:Z(1.0,1.25,2,-2,0,0), fx:['rain','fog','grain'], speaker:N, text:'Out front, Harrow Street glistened. Somebody had walked this pavement tonight, and a camera had been watching.', ambient:'rain' },
  ] },
  loc_hotel: { beats: [
    { set:'hotel', image:'hotel.webp', camera:Z(1.0,1.2,-2,2,0,0), fx:['grain'], speaker:N, text:'The Hotel Meridian. Chandeliers, string quartet, six hundred guests who had been told nothing.', sfx:'transition' },
    { set:'hotel', camera:Z(1.2,1.3), fx:['grain'], speaker:N, text:'Somewhere in this room, a woman had been on stage at 11:45. The question was where she was at 10:40.' },
  ] },

  theory_night: { beats: [
    { set:'city', camera:Z(1.1,1.25), fx:['rain','fog','grain'], speaker:N, text:'Dawn was two hours away. You laid every clue on the table and looked at them.', music:'drone' },
    { set:'clock', camera:Z(1.3,1.5), fx:['dust','grain'], speaker:N, text:'Everyone remembered the time. Now you had to remember the truth.' },
  ] },

  reveal: { beats: [
    { set:'black', hold:1500, sfx:'reveal' },
    { set:'hotel', camera:Z(1.0,1.25), fx:['grain'], speaker:N, text:'10:12 PM. Helena Ashworth slips out of the gala. The valet stub is the only witness.' },
    { set:'street', camera:Z(1.0,1.3), fx:['rain','grain'], speaker:N, text:'10:15. A long coat. An umbrella. Edmund has set out two cups. He expects a difficult conversation with someone he respects.' },
    { set:'office', camera:Z(1.0,1.25), fx:['dust','grain'], speaker:N, text:'Edmund has found it: $240,000 siphoned from the Fenwick Trust into “H.A. Consulting”, his signature pasted onto the approvals.' },
    { set:'phone', camera:Z(1.0,1.3), fx:['grain'], speaker:N, text:'10:32. Julian rings, begging for time about his forgeries. Edmund answers. “Helena’s here, about the accounts.” Julian hears it, and says nothing to anyone.' },
    { set:'workshop', camera:Z(1.0,1.4,0,-4,0,-3), fx:['dust','grain'], speaker:N, text:'≈10:40. Edmund will not bury it. Helena lifts the brass weight from the tall-case clock, the heaviest thing within reach. In the basement, an apprentice hears a thud. Then the regulator stops ticking.', sfx:'tension' },
    { set:'workshop', camera:Z(1.1,1.25), fx:['dust','grain'], speaker:N, text:'She washes the weight in the bench sink, wraps it in the gala napkin from her bag, and hides it in a cupboard. There is no time to do better.' },
    { set:'clock', camera:Z(1.0,1.5), fx:['dust','grain'], speaker:N, text:'Then she thinks. At 11:45 she is due on stage, in front of six hundred witnesses. So she sets the hands to 11:47: the one minute she can prove where she was.' },
    { set:'clock', camera:Z(1.5,1.8), fx:['dust','grain'], speaker:N, text:'But a clock keeps two records. The hands can be moved. The count wheel cannot lie: it last struck ten. She knew nothing about how a clock counts.' },
    { set:'phone', camera:Z(1.0,1.3), fx:['grain'], speaker:N, text:'10:48. She types a message on Edmund’s phone: polite, punctuated, perfect. Edmund had never written like that in his life. His daughter noticed. So did you.' },
    { set:'alley', camera:Z(1.0,1.25), fx:['rain','grain'], speaker:N, text:'10:56, she walks out into the drizzle. At 11:05, Tobias, terrified, slips out the side door. He heard everything and saw nothing. At 11:24, her car glides back to the Meridian.' },
    { set:'hotel', camera:Z(1.0,1.3), fx:['grain'], speaker:N, text:'At 11:45 she takes the stage. And on the night the clock was meant to save her, she says the one thing she could not know: “the very moment he died.”' },
    { set:'interrogation', camera:Z(1.0,1.2), fx:['grain'], speaker:N, text:'Marianne argued with her father and was gone by 10:04. Julian lied to hide a forgery, not a murder. Tobias lied to hide a pawn slip and a mother in care. Three lies. One killer.' },
    { set:'black', hold:1200, center:true, text:'Everyone remembers the time. Nobody remembers the truth.' },
  ] },

  end_A: { beats: [
    { set:'hotel', camera:Z(1.0,1.25), fx:['grain'], speaker:N, text:'They arrested Helena Ashworth at the Meridian, at the top of the grand staircase, under six hundred chandeliers.' },
    { set:'interrogation', camera:Z(1.0,1.15), fx:['grain'], speaker:'HELENA', text:'Edmund always said time keeps the honest. He never said what it does with the rest of us.' , char:{ id:'helena', side:'right' } },
    { set:'workshop', camera:Z(1.0,1.3), fx:['dust','grain'], speaker:N, text:'A week later, Marianne wound the wall regulator by hand. She did not set it to the right time. She set it to the true one.', sfx:'success' },
    { set:'clock', camera:Z(1.3,1.6), fx:['dust','grain'], center:true, text:'10:40 PM.' },
  ] },
  end_B: { beats: [
    { set:'hotel', camera:Z(1.0,1.25), fx:['grain'], speaker:N, text:'Helena Ashworth was arrested. You had the right name. But a name is not a case.' },
    { set:'interrogation', camera:Z(1.0,1.15), fx:['grain'], speaker:N, text:'Her lawyer found the gaps: a motive never fully proven, a method never fully shown, a timeline that did not close. The jury took nine days.' },
    { set:'workshop', camera:Z(1.0,1.3), fx:['dust','grain'], speaker:N, text:'Justice arrived late, and smaller than it should have. In the workshop, the wall regulator still read 11:47.' },
    { set:'clock', camera:Z(1.3,1.6), fx:['dust','grain'], center:true, text:'Nearly.' },
  ] },
  end_C: { beats: [
    { set:'street', camera:Z(1.0,1.25), fx:['rain','siren','grain'], speaker:N, text:'You put your case to the Inspector. The arrest was swift and public. It was also wrong.' },
    { set:'hotel', camera:Z(1.0,1.3), fx:['grain'], speaker:N, text:'Weeks later, Helena Ashworth was named chair of the Fenwick Trust. At the ceremony, she spoke about the importance of honesty.' },
    { set:'clock', camera:Z(1.3,1.6), fx:['dust','grain'], speaker:N, text:'In the workshop on Harrow Street, the wall regulator still read 11:47, and nobody wound it.' },
    { set:'clock', camera:Z(1.6,1.8), fx:['dust','grain'], center:true, text:'The clock was telling you all along.' },
  ] },
};
