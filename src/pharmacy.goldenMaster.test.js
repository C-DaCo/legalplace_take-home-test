import { Drug, Pharmacy } from "./pharmacy";

describe("Pharmacy - Golden Master", () => {
  it("should execute all possible conditional branches", () => {
    const names = [
      "Doliprane",
      "Herbal Tea",
      "Fervex",
      "Magic Pill",
      "Unknown Drug",
    ];
    // edge cases
    const expiresIns = [-1, 0, 1, 5, 6, 10, 11, 15];
    const benefits = [0, 1, 48, 49, 50];
    const sampleLogs = [];

    for (const name of names) {
      for (const expiresIn of expiresIns) {
        for (const benefit of benefits) {
          const pharmacy = new Pharmacy([new Drug(name, expiresIn, benefit)]);

          // 3-day simulation to observe post-expiry evolution
          for (let day = 0; day < 3; day++) {
            pharmacy.updateBenefitValue();
            const drug = pharmacy.drugs[0];
            sampleLogs.push(
              `${name} | Init Exp:${expiresIn} Ben:${benefit} | Day ${day + 1} -> Exp:${drug.expiresIn} Ben:${drug.benefit}`,
            );
          }
        }
      }
    }

    expect(sampleLogs).toMatchSnapshot();
  });
});
