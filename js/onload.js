export function preloadImages(imageUrls) {
  imageUrls.forEach((url) => {
    const img = new Image();
    img.src = url;
  });
}

// List of image URLs to preload
export const imageUrls = [
  "assets/images/tiles/+6_1.png",
  "assets/images/tiles/+6_2.png",
  "assets/images/tiles/+5_1.png",
  "assets/images/tiles/+5_2.png",
  "assets/images/tiles/+4_1.png",
  "assets/images/tiles/+4_2.png",
  "assets/images/tiles/+3_1.png",
  "assets/images/tiles/+3_2.png",
  "assets/images/tiles/+2_1.png",
  "assets/images/tiles/+2_2.png",
  "assets/images/tiles/+1_1.png",
  "assets/images/tiles/+1_2.png",
  "assets/images/tiles/-6.png",
  "assets/images/tiles/-5.png",
  "assets/images/tiles/-4.png",
  "assets/images/tiles/-3.png",
  "assets/images/tiles/-2.png",
  "assets/images/tiles/-1.png",
  "assets/images/tiles/dragon.png",
  "assets/images/tiles/goldmine.png",
  "assets/images/tiles/mountain.png",
  "assets/images/board/grid.png",
  "assets/images/castles/blue1.png",
  "assets/images/castles/blue2.png",
  "assets/images/castles/blue3.png",
  "assets/images/castles/blue4.png",
  "assets/images/castles/green1.png",
  "assets/images/castles/green2.png",
  "assets/images/castles/green3.png",
  "assets/images/castles/green4.png",
  "assets/images/castles/red1.png",
  "assets/images/castles/red2.png",
  "assets/images/castles/red3.png",
  "assets/images/castles/red4.png",
  "assets/images/castles/yellow1.png",
  "assets/images/castles/yellow2.png",
  "assets/images/castles/yellow3.png",
  "assets/images/castles/yellow4.png",
];
