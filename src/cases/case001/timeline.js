// Timeline events (t = minutes after 9:00 PM, used only to check order), board links and objectives.
export const timeline = {
  minEvents: 8,
  events: [
    { id:'T01', time:'9:40 PM', t:40, text:'Marianne arrives; she and Edmund argue about the sale.', requires:['E16'] },
    { id:'T02', time:'10:04 PM', t:64, text:'Marianne leaves by taxi.', requires:['E11','E22'] },
    { id:'T03', time:'10:12 PM', t:72, text:'Helena’s car leaves the Hotel Meridian.', requires:['E10'] },
    { id:'T04', time:'10:15 PM', t:75, text:'A figure in a long coat and umbrella enters the shop.', requires:['E11'] },
    { id:'T05', time:'10:32 PM', t:92, text:'Julian calls. Edmund answers: “Helena’s here.”', requires:['E07'] },
    { id:'T06', time:'≈10:40 PM', t:100, text:'A thud beneath the workshop. The regulator stops ticking.', requires:['E20'] },
    { id:'T13', time:'??:??', t:100.5, text:'Edmund Vale is killed.', requires:['E20'], deduced:true },
    { id:'T07', time:'10:48 PM', t:108, text:'A message is sent from Edmund’s phone.', requires:['E06'] },
    { id:'T08', time:'10:56 PM', t:116, text:'The umbrella figure leaves, carrying a bag.', requires:['E11'] },
    { id:'T09', time:'11:05 PM', t:125, text:'Tobias slips out the side door.', requires:['E11'] },
    { id:'T10', time:'11:24 PM', t:144, text:'Helena’s car returns to the Meridian.', requires:['E10'] },
    { id:'T11', time:'11:47 PM', t:null, text:'The wall clock reads 11:47.', requires:['E01'], misleading:true, truth:'Fabricated: the hands were set by the killer, to match her speech.' },
    { id:'T12', time:'12:10 AM', t:190, text:'Marianne finds the body and calls the police.', requires:[] },
  ],
};

export const boardLinks = [
  { a:'E01', b:'E02', title:'The clock lied', insight:'The hands say 11:47. The count wheel says the clock last struck ten. The hands were moved after it stopped.' },
  { a:'E02', b:'E20', title:'Two witnesses, one time', insight:'The wheel says the clock stopped between 10:00 and 11:00. Tobias heard the ticking stop at about twenty to eleven. Time of death: roughly 10:40.' },
  { a:'E02', b:'E05', title:'Narrowing the window', insight:'The medical window is 10:00 to midnight. The count wheel cuts it to before 11:00.' },
  { a:'E03', b:'E04', title:'The missing weight', insight:'The tall-case clock is missing its brass weight. The cupboard holds it, washed and wrapped. The weapon was cleaned and hidden, not carried away.' },
  { a:'E04', b:'L:hotel', title:'The gold crest', insight:'The napkin round the weapon carries the Hotel Meridian gala crest. The killer came from the party.' },
  { a:'E04', b:'S:helena', title:'From the gala', insight:'Of the four suspects, only Helena was at the gala that night.' },
  { a:'E10', b:'S:helena', title:'Seventy-two minutes', insight:'Helena’s car left the gala at 10:12 and returned at 11:24. Her alibi has a hole exactly where the murder happened.' },
  { a:'E10', b:'L:hotel', title:'The valet record', insight:'The hotel’s own records contradict the story that Helena never left the ballroom.' },
  { a:'E18', b:'S:helena', title:'“Helena’s here”', insight:'At 10:32 Edmund told Julian that Helena was with him, in the workshop, about the accounts.' },
  { a:'E08', b:'S:helena', title:'The motive', insight:'$240,000 out of the Fenwick Trust into a shell company, approved by Helena alone. Edmund had found it.' },
  { a:'E23', b:'E08', title:'Three trustees', insight:'Edmund, Helena and Julian were all trustees. Every bad payment has only one name on it: H.A.' },
  { a:'E09', b:'S:helena', title:'11:45', insight:'Helena’s speech at 11:45 sits two minutes from the 11:47 on the clock. She knew her own schedule to the minute.' },
  { a:'E21', b:'E24', title:'The slip', insight:'Police told nobody the time on the clock. Helena mentioned it on her own. She could only have known it by being there.' },
  { a:'E21', b:'E25', title:'Caught in a lie', insight:'Helena said Marianne told her the time. Marianne says she told no one. Helena lied about how she knew.' },
  { a:'E06', b:'E17', title:'A message in the wrong voice', insight:'Edmund wrote like a telegram. The 10:48 message is polished. So the 10:48 message is not proof of anything.' },
  { a:'E17', b:'S:helena', title:'A lawyer’s phrasing', insight:'“Regrettably”, “I will”, “Please do not”. It reads like Helena’s speech: formal, complete, and never a contraction.' },
  { a:'E15', b:'E16', title:'A late appointment', insight:'Two cups, one unused. Edmund told Marianne he had a late appointment about the trust. He was waiting for someone he respected enough to make tea for.' },
  { a:'E11', b:'S:marianne', title:'Gone by 10:04', insight:'Marianne left at 10:04. Edmund was still alive at 10:32. She cannot be the killer.' },
  { a:'E22', b:'S:marianne', title:'The cab receipt', insight:'Payment records confirm the 10:06 taxi. Marianne lied about being home, not about leaving early.' },
  { a:'E12', b:'S:marianne', title:'A motive without opportunity', insight:'Losing the shop hurt her, and she said terrible things. But she was gone before the killing.' },
  { a:'E13', b:'S:julian', title:'The forged certificate', insight:'Julian was afraid of Friday. That explains why he lied about the phone call. It does not explain a murder.' },
  { a:'E19', b:'S:julian', title:'Julian’s alibi', insight:'Corvin’s Bar, 10:05 to 11:40. Julian was across the river when Edmund died.' },
  { a:'E07', b:'S:julian', title:'A frightened man’s call', insight:'The 10:32 call is why Julian lied. It is also the last time anyone heard Edmund alive.' },
  { a:'E14', b:'S:tobias', title:'A thief, not a killer', insight:'The pawn slip explains why Tobias lied about the time he left. He was hiding a theft, not a death.' },
  { a:'E20', b:'S:tobias', title:'A witness', insight:'Tobias heard everything from the basement and saw nothing. He is the case’s most important witness, and he was too scared to say so.' },
  { a:'E11', b:'S:tobias', title:'He left after', insight:'Tobias slipped out at 11:05, twenty-five minutes after the thud, and after the umbrella figure had already gone.' },
];

// The first unfinished objective is shown as the player's "next lead".
export const objectives = [
  { text:'Search the workshop. Tap the glowing points in the scene.', done:{ evidence:['E05','E01'] } },
  { text:'Something is odd about the wall clock. Inspect its movement.', done:{ evidence:['E02'] } },
  { text:'Unlock Edmund’s phone. The code is somewhere in the workshop.', done:{ evidence:['E06'] } },
  { text:'Search Edmund’s office upstairs.', done:{ visited:['office'] } },
  { text:'Check the entrance camera at the shop front.', done:{ evidence:['E11'] } },
  { text:'Question the suspects. Present evidence to break their stories.', done:{ evidence:['E16','E18','E20'] } },
  { text:'Follow the money. Something in the Fenwick ledger does not reconcile.', done:{ evidence:['E08'] } },
  { text:'A new lead: visit the gala at the Hotel Meridian.', done:{ evidence:['E10'] } },
  { text:'Rebuild the true timeline. Which time can you trust?', done:{ timelineSolved:true } },
  { text:'Connect your evidence on the Board.', done:{ links:8 } },
];
export const finalObjective = { text:'You have enough. Build your final theory.' };
