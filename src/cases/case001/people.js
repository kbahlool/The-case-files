// CASE 001 — metadata, victim, suspects. Pure data; no UI logic.
export const meta = {
  id: 'case001', number: '001', season: 1,
  title: 'The Last Clock',
  subtitle: 'Everyone remembers the time. Nobody remembers the truth.',
  difficulty: 'Investigator', difficultyLevel: 3, estMinutes: '45–60 min',
  tease: 'A master clockmaker. A stopped clock. A time everyone agrees on.',
  synopsis: 'Ravenmoor. A rainy Tuesday in November. Master horologist Edmund Vale is found dead in his own workshop, the wall regulator frozen at 11:47 PM. Four people loved him, needed him, or feared him. Each of them is lying about something.',
  access: 'FREE',
};

export const victim = {
  id: 'edmund', name: 'Edmund Vale', age: 61, figure: 'short', color: '#c9a45c',
  occupation: 'Master horologist · owner of Vale & Sons',
  bio: 'Third-generation clockmaker, widower, founding trustee of the Fenwick Charitable Trust. Known across Ravenmoor for an unshakeable respect for the truth and a refusal to ever be late.',
  dossier: [
    { label: 'Habits', text: 'Wound every clock in the shop himself, every night. Texted in lowercase, with no punctuation at all.', requires: ['E06'] },
    { label: 'The trust', text: 'Had quietly begun auditing the Fenwick Trust books. He told no one what he found.', requires: ['E08'] },
    { label: 'The sale', text: 'Was negotiating to sell Vale & Sons to the Kessler Group, and told his daughter only that evening.', requires: ['E12'] },
    { label: 'A confrontation', text: 'Had found a forged certificate and planned to confront his oldest business partner on Friday.', requires: ['E13'] },
  ],
};

export const suspects = [
  {
    id: 'marianne', name: 'Marianne Vale', age: 34, figure: 'long', color: '#c98f7a', image: 'marianne.webp',
    occupation: 'Clock restorer at Vale & Sons', relationship: 'Edmund’s daughter',
    personality: 'Fierce, guarded, brilliant with her hands. Loved the shop; resented being kept at the back of it.',
    style: 'Short sentences. Sarcasm as armour.',
    greeting: 'You want to know where I was. Fine. Ask.',
    alibi: 'Says she was home all evening and came to the shop near midnight.',
    suspicious: 'Lied about being home. Someone heard her threaten her father.',
    dossier: [
      { label: 'Public alibi', text: 'Home all night; came by around midnight and found the body.' },
      { label: 'Behaviour', text: 'Angry, evasive, then suddenly brittle whenever the shop’s future comes up.' },
      { label: 'Hidden motive', text: 'Learned that night that her father was selling the family shop to a corporate buyer.', requires: ['E12'] },
      { label: 'Secret', text: 'Was in the shop 9:40–10:04 PM and left after a furious argument.', requires: ['E16'] },
    ],
  },
  {
    id: 'julian', name: 'Julian Roche', age: 48, figure: 'short', color: '#7d9bb8', image: 'julian.webp',
    occupation: 'Antiques dealer', relationship: 'Edmund’s business partner of 25 years',
    personality: 'Charming, sardonic, always performing. Drinks like a man with a bill to pay.',
    style: 'Wry. Deflects with jokes, then over-explains.',
    greeting: 'Detective. I would offer you a drink, but I suspect you would write it down.',
    alibi: 'Says he was drinking alone at Corvin’s Bar on Alder Street.',
    suspicious: 'Claims he had no contact with Edmund, but his number is in Edmund’s phone.',
    dossier: [
      { label: 'Public alibi', text: 'Corvin’s Bar, from about ten. Alone.' },
      { label: 'Behaviour', text: 'Jokes when frightened. Very frightened tonight.' },
      { label: 'Hidden motive', text: 'Edmund found three forged provenance certificates and planned to confront him on Friday.', requires: ['E13'] },
      { label: 'Secret', text: 'Was on the phone with Edmund at 10:32 PM, and heard who was in the room with him.', requires: ['E18'] },
    ],
  },
  {
    id: 'tobias', name: 'Tobias Wren', age: 24, figure: 'cap', color: '#86a886', image: 'tobias.webp',
    occupation: 'Apprentice clockmaker', relationship: 'Edmund’s apprentice of three years',
    personality: 'Earnest, anxious, talks with his hands. Idolised Edmund.',
    style: 'Halting. Apologises constantly.',
    greeting: 'I— sorry. I have never talked to a detective before. Should I sit?',
    alibi: 'Says Edmund sent him home at 9:30.',
    suspicious: 'Has a spare key. Money is tight. His story sounds rehearsed.',
    dossier: [
      { label: 'Public alibi', text: 'Sent home at 9:30 PM.' },
      { label: 'Behaviour', text: 'Won’t hold eye contact. Grips his sleeves.' },
      { label: 'Hidden motive', text: 'Has been selling clock movements to a pawnshop to pay for his mother’s care.', requires: ['E14'] },
      { label: 'Secret', text: 'Was in the basement all night, directly beneath the workshop. He heard everything.', requires: ['E20'] },
    ],
  },
  {
    id: 'helena', name: 'Helena Ashworth', age: 46, figure: 'long', color: '#b7a0cf', image: 'helena.webp',
    occupation: 'Estate attorney', relationship: 'Edmund’s lawyer and Fenwick Trust co-founder',
    personality: 'Immaculate, measured, unfailingly gracious. Never raises her voice.',
    style: 'Formal. Complete sentences. She never uses contractions.',
    greeting: 'Detective. Whatever I can do to help. Edmund was a dear friend.',
    alibi: 'The Harrow Foundation Gala at the Hotel Meridian. Gave the closing remarks at 11:45 PM before 600 guests.',
    suspicious: 'Almost nothing. She is the most helpful person you will meet tonight.',
    dossier: [
      { label: 'Public alibi', text: 'The Harrow Foundation Gala, Hotel Meridian. Closing remarks at 11:45 PM.' },
      { label: 'Behaviour', text: 'Composed. Generous with information. Quick to point out other people’s weaknesses.' },
      { label: 'Hidden motive', text: 'Moved $240,000 out of the Fenwick Trust into “H.A. Consulting”. Edmund found out.', requires: ['E08'] },
      { label: 'Secret', text: 'Her alibi covers 11:45 onward. It does not cover 10:12 to 11:24.', requires: ['E10'] },
    ],
  },
];

// Non-suspect cast used by cinematic scenes.
export const cast = {
  rourke: { id: 'rourke', name: 'Inspector Rourke', figure: 'short', color: '#8fa3b5', image: 'rourke.webp' },
};
