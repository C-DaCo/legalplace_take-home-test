import { Drug, Pharmacy } from "./pharmacy";

describe("Pharmacy", () => {
  describe("Basic rules", () => {
    it("benefit is never negative for standard drugs", () => {
      const drugs = [new Drug("Doliprane", 5, 0), new Drug("Dafalgan", 5, 0)];
      drugs.forEach((drug) => {
        const result = new Pharmacy([drug]).updateBenefitValue();
        expect(result[0].benefit).toBeGreaterThanOrEqual(0);
      });
    });

    it("benefit is never negative after expiration", () => {
      const drugs = [new Drug("Doliprane", 0, 1), new Drug("Dafalgan", 0, 3)];
      drugs.forEach((drug) => {
        const result = new Pharmacy([drug]).updateBenefitValue();
        expect(result[0].benefit).toBeGreaterThanOrEqual(0);
      });
    });

    it("benefit never exceeds 50 for drugs that increase", () => {
      const drugs = [new Drug("Herbal Tea", 5, 50), new Drug("Fervex", 5, 50)];
      drugs.forEach((drug) => {
        const result = new Pharmacy([drug]).updateBenefitValue();
        expect(result[0].benefit).toBeLessThanOrEqual(50);
      });
    });

    it("expiresIn decreases by 1 each day for standard drugs", () => {
      const drugs = [
        new Drug("Doliprane", 10, 20),
        new Drug("Dafalgan", 10, 20),
        new Drug("Herbal Tea", 10, 20),
        new Drug("Fervex", 15, 20),
      ];
      drugs.forEach((drug) => {
        const initialExpiresIn = drug.expiresIn;
        const result = new Pharmacy([drug]).updateBenefitValue();
        expect(result[0].expiresIn).toBe(initialExpiresIn - 1);
      });
    });

    it("should handle empty pharmacy", () => {
      expect(new Pharmacy([]).updateBenefitValue()).toEqual([]);
    });
  });

  // ─────────────────────────────────────────
  // DOLIPRANE
  // ─────────────────────────────────────────

  describe("Doliprane", () => {
    it("should decrease benefit by 1 before expiration", () => {
      expect(
        new Pharmacy([new Drug("Doliprane", 5, 10)]).updateBenefitValue(),
      ).toEqual([new Drug("Doliprane", 4, 9)]);
    });

    it("should decrease benefit twice as fast after expiration", () => {
      expect(
        new Pharmacy([new Drug("Doliprane", 0, 10)]).updateBenefitValue(),
      ).toEqual([new Drug("Doliprane", -1, 8)]);
    });

    it("should decrease benefit twice as fast when expiresIn is negative", () => {
      expect(
        new Pharmacy([new Drug("Doliprane", -3, 10)]).updateBenefitValue(),
      ).toEqual([new Drug("Doliprane", -4, 8)]);
    });

    it("should not go below 0 when benefit is 1 after expiration", () => {
      expect(
        new Pharmacy([new Drug("Doliprane", 0, 1)]).updateBenefitValue(),
      ).toEqual([new Drug("Doliprane", -1, 0)]);
    });
  });

  // ─────────────────────────────────────────
  // HERBAL TEA
  // ─────────────────────────────────────────

  describe("Herbal Tea", () => {
    it("should increase benefit by 1 before expiration", () => {
      expect(
        new Pharmacy([new Drug("Herbal Tea", 10, 20)]).updateBenefitValue(),
      ).toEqual([new Drug("Herbal Tea", 9, 21)]);
    });

    it("should increase benefit by 2 after expiration", () => {
      expect(
        new Pharmacy([new Drug("Herbal Tea", 0, 20)]).updateBenefitValue(),
      ).toEqual([new Drug("Herbal Tea", -1, 22)]);
    });

    it("should increase benefit by 2 when expiresIn is negative", () => {
      expect(
        new Pharmacy([new Drug("Herbal Tea", -5, 20)]).updateBenefitValue(),
      ).toEqual([new Drug("Herbal Tea", -6, 22)]);
    });

    it("should cap at 50 before expiration", () => {
      expect(
        new Pharmacy([new Drug("Herbal Tea", 5, 50)]).updateBenefitValue(),
      ).toEqual([new Drug("Herbal Tea", 4, 50)]);
    });

    it("should cap at 50 even if increase by 2 would exceed it", () => {
      expect(
        new Pharmacy([new Drug("Herbal Tea", -1, 49)]).updateBenefitValue(),
      ).toEqual([new Drug("Herbal Tea", -2, 50)]);
    });
  });

  // ─────────────────────────────────────────
  // MAGIC PILL
  // ─────────────────────────────────────────

  describe("Magic Pill", () => {
    it("should never change expiresIn", () => {
      expect(
        new Pharmacy([new Drug("Magic Pill", 15, 40)]).updateBenefitValue(),
      ).toEqual([new Drug("Magic Pill", 15, 40)]);
    });

    it("should never change benefit", () => {
      expect(
        new Pharmacy([new Drug("Magic Pill", 0, 40)]).updateBenefitValue(),
      ).toEqual([new Drug("Magic Pill", 0, 40)]);
    });

    it("should never change even with negative expiresIn", () => {
      expect(
        new Pharmacy([new Drug("Magic Pill", -5, 40)]).updateBenefitValue(),
      ).toEqual([new Drug("Magic Pill", -5, 40)]);
    });
  });

  // ─────────────────────────────────────────
  // FERVEX
  // ─────────────────────────────────────────

  describe("Fervex", () => {
    it("should increase benefit by 1 when more than 10 days", () => {
      expect(
        new Pharmacy([new Drug("Fervex", 12, 35)]).updateBenefitValue(),
      ).toEqual([new Drug("Fervex", 11, 36)]);
    });

    it("should increase benefit by 2 when exactly 10 days", () => {
      expect(
        new Pharmacy([new Drug("Fervex", 10, 35)]).updateBenefitValue(),
      ).toEqual([new Drug("Fervex", 9, 37)]);
    });

    it("should increase benefit by 2 when between 6 and 10 days", () => {
      expect(
        new Pharmacy([new Drug("Fervex", 7, 35)]).updateBenefitValue(),
      ).toEqual([new Drug("Fervex", 6, 37)]);
    });

    it("should increase benefit by 3 when exactly 5 days", () => {
      expect(
        new Pharmacy([new Drug("Fervex", 5, 35)]).updateBenefitValue(),
      ).toEqual([new Drug("Fervex", 4, 38)]);
    });

    it("should increase benefit by 3 when less than 5 days", () => {
      expect(
        new Pharmacy([new Drug("Fervex", 3, 35)]).updateBenefitValue(),
      ).toEqual([new Drug("Fervex", 2, 38)]);
    });

    it("should increase benefit by 3 when 1 day left", () => {
      expect(
        new Pharmacy([new Drug("Fervex", 1, 35)]).updateBenefitValue(),
      ).toEqual([new Drug("Fervex", 0, 38)]);
    });

    it("should drop benefit to 0 after expiration", () => {
      expect(
        new Pharmacy([new Drug("Fervex", 0, 35)]).updateBenefitValue(),
      ).toEqual([new Drug("Fervex", -1, 0)]);
    });

    it("should keep benefit at 0 after expiration", () => {
      expect(
        new Pharmacy([new Drug("Fervex", -3, 0)]).updateBenefitValue(),
      ).toEqual([new Drug("Fervex", -4, 0)]);
    });

    it("should cap at 50 even if increase by 3 would exceed it", () => {
      expect(
        new Pharmacy([new Drug("Fervex", 3, 48)]).updateBenefitValue(),
      ).toEqual([new Drug("Fervex", 2, 50)]);
    });
  });

  // ─────────────────────────────────────────
  // DAFALGAN
  // ─────────────────────────────────────────

  describe("Dafalgan", () => {
    it("should decrease benefit by 2 before expiration", () => {
      expect(
        new Pharmacy([new Drug("Dafalgan", 10, 20)]).updateBenefitValue(),
      ).toEqual([new Drug("Dafalgan", 9, 18)]);
    });

    it("should decrease benefit by 4 after expiration", () => {
      expect(
        new Pharmacy([new Drug("Dafalgan", 0, 20)]).updateBenefitValue(),
      ).toEqual([new Drug("Dafalgan", -1, 16)]);
    });

    it("should decrease benefit by 4 when expiresIn is negative", () => {
      expect(
        new Pharmacy([new Drug("Dafalgan", -2, 20)]).updateBenefitValue(),
      ).toEqual([new Drug("Dafalgan", -3, 16)]);
    });

    it("should never have negative benefit", () => {
      expect(
        new Pharmacy([new Drug("Dafalgan", 5, 1)]).updateBenefitValue(),
      ).toEqual([new Drug("Dafalgan", 4, 0)]);
    });

    it("should never have negative benefit after expiration", () => {
      expect(
        new Pharmacy([new Drug("Dafalgan", 0, 3)]).updateBenefitValue(),
      ).toEqual([new Drug("Dafalgan", -1, 0)]);
    });
  });

  // ─────────────────────────────────────────
  // MULTIPLE DRUGS INTERACTION
  // ─────────────────────────────────────────

  describe("Drug independence", () => {
    it("should update all drugs independently", () => {
      const pharmacy = new Pharmacy([
        new Drug("Doliprane", 5, 10),
        new Drug("Magic Pill", 15, 40),
        new Drug("Herbal Tea", 3, 20),
        new Drug("Dafalgan", 5, 10),
      ]);
      expect(pharmacy.updateBenefitValue()).toEqual([
        new Drug("Doliprane", 4, 9),
        new Drug("Magic Pill", 15, 40),
        new Drug("Herbal Tea", 2, 21),
        new Drug("Dafalgan", 4, 8),
      ]);
    });
  });
});
