import { NormalDrug } from "./NormalDrug";

export class Dafalgan extends NormalDrug {
  updateBenefit() {
    const degradation = this.drug.expiresIn < 0 ? 4 : 2;
    this.setBenefit(this.drug.benefit - degradation);
  }
}
