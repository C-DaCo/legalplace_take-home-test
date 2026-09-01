import { NormalDrug } from "./NormalDrug";
import { HerbalTea } from "./HerbalTea";
import { MagicPill } from "./MagicPill";
import { Fervex } from "./Fervex";
import { Dafalgan } from "./Dafalgan";

export class DrugFactory {
  static getStrategy(drug) {
    switch (drug.name) {
      case "Herbal Tea":
        return new HerbalTea(drug);
      case "Fervex":
        return new Fervex(drug);
      case "Magic Pill":
        return new MagicPill(drug);
      case "Dafalgan":
        return new Dafalgan(drug);
      default:
        return new NormalDrug(drug);
    }
  }
}
