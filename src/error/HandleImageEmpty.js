export const dummyImageUrl =
    "https://dummyimage.com/240x320/cacaca/f16739&text=Poster+Not+Found";

export default function handleImageEmpty(event) {
    event.target.src = dummyImageUrl;
}