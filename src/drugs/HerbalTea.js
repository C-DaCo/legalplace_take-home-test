import { NormalDrug } from "./NormalDrug";

export class HerbalTea extends NormalDrug {
  updateBenefit() {
    const increase = this.drug.expiresIn < 0 ? 2 : 1;
    this.setBenefit(this.drug.benefit + increase);
  }
}
