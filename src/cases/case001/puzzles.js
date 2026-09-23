// Story puzzles. Types: choice | code | order | match. Every puzzle teaches something about the case (`lesson`).
export const puzzles = {
  P1: { id:'P1', title:'The Striking Train', type:'choice', rewards:['E02'],
    intro:'A wall regulator strikes the hour, counting 1–12 with a count wheel. The lever rests in the notch of the LAST hour it struck. Read the wheel below.',
    exhibit:{ kind:'countwheel', lever:10, handsLabel:'Hands: 11:47' },
    question:'The hands read 11:47, but the lever rests in the TEN notch. What does that prove?',
    options:[
      { id:'a', text:'The clock ran normally until 11:47.', feedback:'A running clock would have struck eleven at 11:00, and the lever would sit in the eleven notch.' },
      { id:'b', text:'It last struck ten, so it stopped between 10:00 and 11:00. Someone moved the hands afterwards.', correct:true },
      { id:'c', text:'The movement jammed; the wheel is unreliable.', feedback:'A jam leaves scratches and bent teeth. This wheel is clean.' },
      { id:'d', text:'Nothing. A striking train and its hands are unrelated.', feedback:'They are linked by the same clock train. Hands and strike normally agree.' },
    ],
    lesson:'The famous 11:47 is a lie told with the clock’s own hands. The real stop was an hour earlier.' },

  P2: { id:'P2', title:'Edmund’s Phone', type:'code', answer:'1887', digits:4, rewards:['E06','E07'],
    intro:'The phone wants a four-digit code. Edmund was sentimental and never changed a habit in his life.',
    hint:{ requiresExamined:'workshop:plaque', text:'The brass plaque over the workshop door has a four-digit year on it.', fallback:'Edmund would choose something tied to the shop itself. Look around the workshop first.' },
    lesson:'The phone opens: a last message at 10:48, and a call at 10:32 from someone who later denied it.' },

  P3: { id:'P3', title:'The Fenwick Ledger', type:'choice', rewards:['E08'],
    intro:'Fenwick grants must go to a registered charity and carry TWO trustee signatures. One entry breaks both rules.',
    exhibit:{ kind:'lines', lines:[
      'MAR  Harbor Children’s Fund      $12,000   E.V. + J.R.',
      'JUN  Sunrise Clinic               $8,500   E.V. + J.R.',
      'AUG  H.A. Consulting Ltd         $60,000   H.A. (E.V. scan)',
      'NOV  Ravenmoor Public Library    $15,000   E.V. + J.R.',
      'JAN  Fenwick Scholarship Fund    $20,000   E.V. + J.R.',
    ] },
    question:'Which entry does not reconcile?',
    options:[
      { id:'a', text:'MAR — Harbor Children’s Fund', feedback:'Registered charity, two signatures. Fine.' },
      { id:'b', text:'JUN — Sunrise Clinic', feedback:'Registered charity, two signatures. Fine.' },
      { id:'c', text:'AUG — H.A. Consulting Ltd', correct:true },
      { id:'d', text:'NOV — Ravenmoor Public Library', feedback:'Registered charity, two signatures. Fine.' },
    ],
    lesson:'Four payments like the AUG entry add up to $240,000, all to a company that is not a charity, all signed off by H.A. alone.' },

  P4: { id:'P4', title:'Four Clips', type:'order', rewards:['E11'],
    intro:'The recorder saved four motion clips but lost the timestamps. Rain fell heavily early on, thinned to a drizzle, then stopped. Put the clips in order.',
    items:[
      { id:'c3', text:'Drizzle. The umbrella figure leaves the shop, carrying a bag.' },
      { id:'c1', text:'Heavy rain. A young woman hurries out and hails a cab.' },
      { id:'c4', text:'Rain has stopped. Puddles. A young man slips out the side door.' },
      { id:'c2', text:'Heavy rain. A figure in a long coat and umbrella enters.' },
    ],
    order:['c1','c2','c3','c4'],
    stamps:{ c1:'10:04 PM · Marianne leaves', c2:'10:15 PM · Umbrella figure enters', c3:'10:56 PM · Umbrella figure leaves with bag', c4:'11:05 PM · Tobias leaves' },
    lesson:'Someone came in at 10:15 and left at 10:56, in the middle of the killing window, carrying something. The other two clips are outside it.' },

  P5: { id:'P5', title:'Alibi Check', type:'match', rewards:[],
    intro:'Match each suspect to what their alibi really covers. The true window for the killing is about 10:32 to 10:48 PM.',
    left:[ { id:'marianne', text:'Marianne' }, { id:'julian', text:'Julian' }, { id:'tobias', text:'Tobias' }, { id:'helena', text:'Helena' } ],
    right:[
      { id:'r1', text:'Her cab left at 10:06. She was gone before Edmund answered a call at 10:32.', match:'marianne' },
      { id:'r2', text:'Bar tab 10:05–11:40 across the river, so he could not be in the workshop at 10:40.', match:'julian' },
      { id:'r3', text:'Downstairs and afraid. He left after the umbrella figure did, and is a witness, not a killer.', match:'tobias' },
      { id:'r4', text:'A stage at 11:45, but a valet stub shows her car away from 10:12 to 11:24.', match:'helena' },
    ],
    lesson:'Three suspects are cleared by the true window. The only alibi that fails there is the one built on the false time.' },
};
