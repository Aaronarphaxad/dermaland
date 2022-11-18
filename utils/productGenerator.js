let drySkinPlain = {
  morning: [
    "Cleanser",
    "Arpha Arbutin",
    "Glycerin",
    "Niacinamide",
    "Sunscreen SPF30+",
  ],
  night: ["Cleanser", "Niacinamide", "Moisturiser", "Retinoids"],
};
let drySkinPigmentation = {
  morning: [
    "Cleanser",
    "Arpha Arbutin",
    "Niacinamide",
    "Sunscreen SPF30+",
    "Vitamin C",
    "Moisturiser",
  ],
  night: [
    "Cleanser",
    "Niacinamide",
    "Moisturiser",
    "Retinoids",
    "Azelaic Acid",
    "Peptides",
  ],
};

let drySkinAcne = {
  morning: [
    "Cleanser",
    "Niacinamide",
    "Hyaluronic acid",
    "Sunscreen SPF30+",
    "Arpha Arbutin",
    "Vitamin C",
  ],
  night: [
    "Cleanser",
    "Niacinamide",
    "Ceramides",
    "Retinoids",
    "Azelaic Acid",
    "Benzyl Peroxide",
    "Moisturiser",
  ],
};

let normalSkinPlain = {
  morning: [
    "Cleanser",
    "Glycerin",
    "Vitamin C",
    "Niacinamide",
    "Sunscreen SPF30+",
  ],
  night: ["Cleanser", "Niacinamide", "Peeling solution", "Retinoids"],
};

let normalSkinPigmentaion = {
  morning: ["Cleanser", "Vitamin C", "Niacinamide", "Sunscreen SPF30+"],
  night: ["Cleanser", "Niacinamide", "Hydroquinone", "Retinoids"],
};

let normalSkinAcne = {
  morning: [
    "Cleanser",
    "Glycerin",
    "Vitamin C",
    "Niacinamide",
    "Sunscreen SPF30+",
  ],
  night: [
    "Cleanser",
    "Niacinamide",
    "Hydroquinone",
    "BHA(Salicylic acid)",
    "Retinoids",
  ],
};

let oilySkinPlain = {
  morning: [
    "Cleanser",
    "Masks(weekly)",
    "Vitamin C",
    "Niacinamide",
    "Sunscreen SPF30+",
  ],
  night: [
    "Cleanser",
    "Niacinamide",
    "Glycolic acid",
    "Retinol",
    "Moisturiser(Light)",
  ],
};

let oilySkinPigmentation = {
  morning: [
    "Cleanser",
    "Masks(weekly)",
    "Vitamin C",
    "Niacinamide",
    "Sunscreen SPF30+",
  ],
  night: [
    "Cleanser",
    "Glycolic acid",
    "Arpha Arbutin",
    "Niacinamide",
    "Retinol",
    "Moisturiser(Light)",
  ],
};

let oilySkinAcne = {
  morning: [
    "Cleanser",
    "Masks(weekly)",
    "Vitamin C",
    "Retinoids",
    "Niacinamide",
    "Sunscreen SPF30+",
  ],
  night: [
    "Cleanser",
    "Glycolic acid",
    "Azelaic acid",
    "Niacinamide",
    "Retinoids",
    "Moisturiser(Light)",
  ],
};

let sensitiveSkin = {
  morning: ["Cleanser", "Vitamin C", "Niacinamide", "Sunscreen SPF30+"],
  night: ["Cleanser", "Niacinamide", "Retinoids", "Peptides", "Moisturiser"],
};

export default function productsGenerator(productInfo) {
  let { type, sensitive, acne, pigmentation } = productInfo;

  if (!type) {
    type = "Normal";
  }
  if (type === "N/A") {
    type === "Normal";
  }
  if (sensitive) {
    return sensitiveSkin;
  }
  if (type === "Dry") {
    if (acne) {
      return drySkinAcne;
    }
    if (pigmentation) {
      return drySkinPigmentation;
    }
    return drySkinPlain;
  }
  if (type === "Oily") {
    if (acne) {
      return oilySkinAcne;
    }
    if (pigmentation) {
      return oilySkinPigmentation;
    }
    return oilySkinPlain;
  }
  if (type === "Normal" || "N/A") {
    if (acne) {
      return normalSkinAcne;
    }
    if (pigmentation) {
      return normalSkinPigmentaion;
    }
    return normalSkinPlain;
  }
}
