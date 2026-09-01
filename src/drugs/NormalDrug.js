export class NormalDrug {
  constructor(drug) {
    this.drug = drug;
  }

  update() {
    this.decreaseExpiresIn();
    this.updateBenefit();
  }

  decreaseExpiresIn() {
    this.drug.expiresIn -= 1;
  }

  updateBenefit() {
    const degradation = this.drug.expiresIn < 0 ? 2 : 1;
    this.setBenefit(this.drug.benefit - degradation);
  }

  setBenefit(value) {
    this.drug.benefit = Math.max(0, Math.min(50, value));
  }
}
