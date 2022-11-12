export const isEmail = (email) =>
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

function padTo2Digits(num) {
  return num.toString().padStart(2, "0");
}

export function convertMsToTime(data) {
  return new Date(data * 1000).toISOString().slice(11, 19);
}

export const getRandomImg = () => {
  const items = [
    "https://res.cloudinary.com/gifts-paddy/image/upload/v1667939766/dermaland/IMG_2263_jofeew.jpg",
    "https://res.cloudinary.com/gifts-paddy/image/upload/v1667939766/dermaland/IMG_2259_k1oiya.jpg",
    "https://res.cloudinary.com/gifts-paddy/image/upload/v1667939766/dermaland/IMG_2262_u9m9x2.jpg",
    "https://res.cloudinary.com/gifts-paddy/image/upload/v1667939766/dermaland/IMG_2261_j6pwxc.jpg",
    "https://res.cloudinary.com/gifts-paddy/image/upload/v1667939766/dermaland/IMG_2258_oyftls.jpg",
    "https://res.cloudinary.com/gifts-paddy/image/upload/v1667939766/dermaland/IMG_2260_dgra8v.jpg",
    "https://res.cloudinary.com/gifts-paddy/image/upload/v1667939765/dermaland/IMG_2256_elftvn.jpg",
    "https://res.cloudinary.com/gifts-paddy/image/upload/v1667939765/dermaland/IMG_2254_xfew4r.jpg",
    "https://res.cloudinary.com/gifts-paddy/image/upload/v1667939765/dermaland/IMG_2257_qfmzel.jpg",
    "https://res.cloudinary.com/gifts-paddy/image/upload/v1667939765/dermaland/IMG_2252_wtnnpk.jpg",
    "https://res.cloudinary.com/gifts-paddy/image/upload/v1667939765/dermaland/IMG_2253_net7tq.jpg",
    "https://res.cloudinary.com/gifts-paddy/image/upload/v1667939765/dermaland/IMG_2255_rswwkf.jpg",
  ];
  var item = items[Math.floor(Math.random() * items.length)];
  return item;
};
