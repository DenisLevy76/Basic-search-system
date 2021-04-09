export default async function getPosts() {
    const promisePost = fetch('https://jsonplaceholder.typicode.com/posts');
    const promisePhotos = fetch('https://jsonplaceholder.typicode.com/photos');

    const [posts, photos] = await Promise.all([promisePost, promisePhotos]);

    const postsJSON = await posts.json();
    const photosJSON = await photos.json();

    const postsAndPhotos = postsJSON.map((post, index) => {
      return {...post, img: photosJSON[index].url}
    })

    return postsAndPhotos;
}