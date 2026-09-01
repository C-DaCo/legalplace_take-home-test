import { NormalDrug } from "./NormalDrug";

export class MagicPill extends NormalDrug {
  update() {
    // Magic Pill never expires nor decreases in benefit
  }
}
