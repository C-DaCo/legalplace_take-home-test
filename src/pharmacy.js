import { DrugFactory } from "./drugs/DrugFactory";

export class Drug {
  constructor(name, expiresIn, benefit) {
    this.name = name;
    this.expiresIn = expiresIn;
    this.benefit = benefit;
  }
}

export class Pharmacy {
  constructor(drugs = []) {
    this.drugs = drugs;
  }

  updateBenefitValue() {
    for (const drug of this.drugs) {
      const strategy = DrugFactory.getStrategy(drug);
      strategy.update();
    }
    return this.drugs;
  }
}
