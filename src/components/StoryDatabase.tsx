// src/components/StoryDatabase.ts
export const storyDatabase = {
  westAfrican: {
    '1': {
      id: '1',
      title: "Anansi and the Wisdom Pot",
      content: `Long ago in Ghana, Anansi the spider believed he could hoard all the world's wisdom in a clay pot. After gathering every bit of knowledge, he tied the pot around his neck with a vine and attempted to climb a tall palm tree to hide it.

"Not so fast, Anansi!" called his son Ntikuma from below. "Your pot hangs awkwardly. Tie it to your back instead!"

As Anansi adjusted the pot, it slipped and shattered on the ground, scattering wisdom everywhere. The people of the village came and each took a piece. That's why today, wisdom belongs to everyone - because no single person can keep it all for themselves.`,
      moral: "Knowledge grows when shared",
      region: "West African",
      duration: 4, // minutes
      keywords: ["spider", "wisdom", "sharing"],
      culturalNote: "Anansi stories originated with the Ashanti people of Ghana"
    },
    '2': {
      id: '2',
      title: "Why Mosquitoes Buzz in Ears",
      content: `When the world was new, Mosquito attended a council where Python announced a grand feast. Excited, Mosquito told Iguana, who didn't believe her and stuffed sticks in his ears. When Python greeted Iguana, who couldn't hear, Python assumed he was being snubbed.

This misunderstanding spread through the animal kingdom like wildfire - Monkey attacked Crow, who fled into Deer, who trampled a farmer's yam patch. When the creator finally sorted things out, Mosquito was sentenced to forever ask "Zee! Is everyone still angry?" by buzzing in ears.`,
      moral: "Think before spreading rumors",
      region: "West African",
      duration: 5,
      keywords: ["mosquito", "misunderstanding", "consequences"]
    }
  },
  nordic: {
    '3': {
      id: '3',
      title: "Thor's Fishing Trip",
      content: `The mighty Thor once disguised himself as a youth and joined the giant Hymir on a fishing trip. When Hymir refused to provide bait, Thor tore the head off Hymir's largest ox. They rowed far out to sea where Hymir caught two whales, but Thor baited his hook with the ox head and caught Jörmungandr, the world serpent!

As Thor battled the monstrous snake, Hymir cut the line in terror. The serpent sank beneath the waves, and Thor knocked Hymir overboard with his hammer for his cowardice. This explains why the sea is salty - from Jörmungandr's eternal venom.`,
      moral: "Courage faces even the mightiest challenges",
      region: "Nordic",
      duration: 6,
      keywords: ["Thor", "serpent", "fishing"],
      culturalNote: "From the Poetic Edda, 13th century Icelandic texts"
    }
  }
};

export const getStoriesByRegion = (regionId: string) => {
  const regionStories = {
    'west-african': storyDatabase.westAfrican,
    'nordic': storyDatabase.nordic
  };
  return regionStories[regionId as keyof typeof regionStories] || {};
};