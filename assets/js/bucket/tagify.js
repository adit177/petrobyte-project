const tagifyConstantTags = {
  tagify    : [
    "tag_const_1", "tag_const_2"
  ],
  items     : [
    "Petrol", "Diesel", "CNG",
  ],
  units     : [
    "Litre", "Kilogram", "Cubic Meter",
  ],
  tanks_size: [
    "10 KL", "15 KL", "20 KL", "25 KL", "30 KL",
  ]
}


const getTagifyTags = (key) => {
  return tagifyConstantTags.hasOwnProperty(key) ? tagifyConstantTags[key] : [];
}

export default getTagifyTags;