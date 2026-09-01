import { NormalDrug } from "./NormalDrug";

export class Fervex extends NormalDrug {
  updateBenefit() {
    if (this.drug.expiresIn < 0) {
      this.setBenefit(0);
      return;
    }

    let increase = 1;
    if (this.drug.expiresIn < 5) {
      increase = 3;
    } else if (this.drug.expiresIn < 10) {
      increase = 2;
    }

    this.setBenefit(this.drug.benefit + increase);
  }
}
