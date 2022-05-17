import { battle, event, person, timeline } from "../../types.ts";
import parseYaml from "../../yaml.ts";

const timelines = parseYaml("../../data/timeline.yaml") as timeline[];
const battles = parseYaml("../../data/battles.yaml") as battle[];
const people = parseYaml("../../data/people.yaml") as person[];
const events = parseYaml("../../data/events.yaml") as event[];
const headers = { "Content-Type": "application/json" };

timelines.forEach((timeline) => {
  const { name, type } = timeline;
  switch (type) {
    case "person":
      timeline.data = people.find((person) => person.name === name);
      break;
    case "event":
      timeline.data = events.find((event) => event.name === name);
      break;
    case "battle":
      timeline.data = battles.find((battle) => battle.name === name);
      break;
  }
});

export default async () => {
  return new Response(JSON.stringify(timelines), { headers });
};
