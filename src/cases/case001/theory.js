// Final theory: questions, correct answers, scoring weights and endings.
export const theory = {
  killer: 'helena',
  points: { killer:30, motive:20, method:20, time:10, timeline:10, evidence:10 },
  questions: [
    { id:'killer', title:'Who is the killer?', kind:'suspect' },
    { id:'motive', title:'What was the motive?', kind:'options', correct:'m3', options:[
      { id:'m1', text:'To stop Edmund selling the family business.' },
      { id:'m2', text:'To bury forged provenance certificates before Friday.' },
      { id:'m3', text:'To cover the theft of trust funds that Edmund had just uncovered.' },
      { id:'m4', text:'An old personal grudge over a betrayal.' },
      { id:'m5', text:'To stop Edmund exposing the apprentice’s thefts.' } ] },
    { id:'method', title:'How was the murder committed?', kind:'options', correct:'h1', options:[
      { id:'h1', text:'A blow with the tall-case clock’s brass weight, then washed, wrapped and hidden.' },
      { id:'h2', text:'Pushed from the workshop ladder, staged as an accident.' },
      { id:'h3', text:'Strangled with a clock cord.' },
      { id:'h4', text:'Poisoned tea.' },
      { id:'h5', text:'Stabbed with a clockmaker’s tool, then the tool was removed.' } ] },
    { id:'time', title:'When did it actually happen?', kind:'options', correct:'t2', options:[
      { id:'t1', text:'About 10:04 PM, right after the argument with Marianne.' },
      { id:'t2', text:'About 10:40 PM, after Julian’s call and before the 10:48 message.' },
      { id:'t3', text:'About 11:05 PM, as the apprentice left.' },
      { id:'t4', text:'At 11:47 PM, when the wall clock stopped.' },
      { id:'t5', text:'About 12:05 AM, shortly before the body was found.' } ] },
    { id:'evidence', title:'What is your key evidence?', kind:'evidence', correct:['E10','E18','E04','E21'] },
  ],
  correct: { motive:'m3', method:'h1', time:'t2', evidence:['E10','E18','E04','E21'] },
};

export const endings = {
  A: { id:'A', title:'The Truth Revealed', label:'PERFECT INVESTIGATION', scene:'end_A',
    summary:'You named the killer, the motive, the method and the true time. Every clue paid off.' },
  B: { id:'B', title:'Half the Truth', label:'PARTIAL TRUTH', scene:'end_B',
    summary:'You found the killer, but the case had holes. Justice will take a long time.' },
  C: { id:'C', title:'The Wrong Door', label:'WRONG THEORY', scene:'end_C',
    summary:'The wrong person paid for the crime. The real killer walked free.' },
};
