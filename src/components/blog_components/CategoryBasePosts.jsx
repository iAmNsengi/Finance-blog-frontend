// Kategorilere özel kategori sayfası
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchPostsByCategory } from "../../app/features/blogs/postsSlice";
import BlogsSkeleton from "./blog/BlogsSkeleton";
import PostCardComponent from "./blog/PostCardComponent";
import ServerErrorComponent from "../../components/uyarılar/ServerErrorComponent";
export default function CategoryBasePosts() {
  const dispatch = useDispatch();
  const { category } = useParams(); // URL’den kategori parametresi alınıyor

  // Redux'tan postları alın
  const { posts, isLoading, isError, errorMessage } = useSelector(
    (state) => state.posts
  );

  useEffect(() => {
    if (category) {
      dispatch(fetchPostsByCategory(category));
    }
  }, [dispatch, category]);

  if (isLoading) {
    return <BlogsSkeleton />;
  }
  if (isError) {
    return <ServerErrorComponent message={errorMessage} />;
  }

  function slugToReadable(slug) {
    return slug
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  return (
    <div className="bg-white py-2 mb-12 min-h-full">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        {/* Başlık ve alt bilgi kısmı */}
        <div className="mx-auto lg:mx-0 text-start bg-gradient-to-r py-4">
          <h1 className="text-pretty text-2xl font-semibold sm:text-4xl">
            {slugToReadable(category)}
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            {slugToReadable(category)} kategorisindeki güncel içeriklerimizi
            keşfedin.
          </p>
        </div>

        {/* Blog yazıları listesi */}
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-y-12 border-t border-gray-200 pt-6 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {posts.map((post) => (
            <PostCardComponent key={post._id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}
