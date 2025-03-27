import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchImages,
  deleteImage,
  clearImageErrors,
} from "../../app/features/image/imageGallerySlice";
import { Button, Pagination } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import ImageUploaderModal from "../../components/blog_components/image/ImageUploaderModal";
import BlogSidebarComponent from "../../components/blog_components/blog_dashboard/BlogSidebarComponent";
import ErrorBoundary from "../../components/Error/ErrorBoundary";
import { useFeedback } from "../../context/FeedbackContext";
import useScrollToTop from "../../hooks/useScrollToTop";
import { scrollToTop } from "../../utils/scrollHelpers";

function GalleryPage() {
  const dispatch = useDispatch();
  const { images, loading, error, page, totalPages } = useSelector(
    (state) => state.imageGallery
  );
  const { showToast, success, error: showError, warning } = useFeedback();

  const [selectedImageId, setSelectedImageId] = useState(null);
  const [isUploaderOpen, setIsUploaderOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Page değiştiğinde sayfayı en üste kaydır
  useScrollToTop(currentPage, { behavior: "auto", delay: 100 });

  // İlk yükelemede 20 görseli çek
  useEffect(() => {
    dispatch(fetchImages({ page: currentPage, limit: 20 }));
  }, [dispatch, currentPage]);

  // Hata mesajı varsa bildirim göster
  useEffect(() => {
    if (error) {
      showError(error);
      // Hata mesajını gösterdikten sonra temizle
      setTimeout(() => {
        dispatch(clearImageErrors());
      }, 3000);
    }
  }, [error, dispatch, showError]);

  // Bir görseli seçme
  const handleSelectImage = (id) => {
    setSelectedImageId(id === selectedImageId ? null : id);
  };

  // Kopyalama
  const handleCopy = () => {
    if (!selectedImageId) {
      warning("Lütfen bir görsel seçin.");
      return;
    }
    const foundImage = images.find((img) => img._id === selectedImageId);
    if (!foundImage) {
      showError("Seçilen görsel bulunamadı.");
      return;
    }

    const markdownLink = `![Resim Açıklaması](${foundImage.url})`;
    navigator.clipboard
      .writeText(markdownLink)
      .then(() => {
        success("Görsel linki kopyalandı!");
      })
      .catch((err) => {
        console.error("Kopyalama hatası:", err);
        showError("Kopyalama sırasında bir hata oluştu.");
      });
  };

  // Silme
  const handleDelete = () => {
    if (!selectedImageId) {
      warning("Lütfen silmek için bir görsel seçin.");
      return;
    }
    if (!window.confirm("Bu görseli silmek istediğinize emin misiniz?")) return;

    dispatch(deleteImage(selectedImageId))
      .unwrap()
      .then((result) => {
        setSelectedImageId(null);
        success("Görsel başarıyla silindi.");
        dispatch(fetchImages({ page: currentPage, limit: 20 }));
      })
      .catch((err) => {
        console.error("Silme hatası:", err);
        showError(err.message || "Görsel silinirken bir hata oluştu.");
      });
  };

  // Sayfalama
  const handlePageChange = (newPage) => {
    // Önce sayfayı tam olarak en üste kaydır, sonra sayfa değişimini gerçekleştir
    scrollToTop({ behavior: "instant", delay: 0 });
    setCurrentPage(newPage);
    setSelectedImageId(null);
  };

  const handleReload = () => {
    dispatch(fetchImages({ page: currentPage, limit: 20 }));
    setSelectedImageId(null);
    success("Görseller yenilendi.");
  };

  // "Görsel Ekle" butonu: modal aç
  const handleAddImage = () => {
    setIsUploaderOpen(true);
  };

  return (
    <div className="flex min-h-screen w-full">
      {/* Sidebar solda sabit */}
      <BlogSidebarComponent />

      {/* İçerik */}
      <div className="flex-1 p-4 md:p-6 overflow-x-auto">
        {/* Üst Butonlar */}
        <div className="mb-4 flex flex-wrap gap-2 justify-end">
          <Button
            variant="flat"
            color="default"
            startContent={<Icon icon="material-symbols:refresh" />}
            onPress={handleReload}
          >
            Yeniden Yükle
          </Button>

          <Button variant="flat" color="default" onPress={handleCopy}>
            Kopyala
          </Button>

          <Button variant="flat" color="danger" onPress={handleDelete}>
            Sil
          </Button>

          <Button variant="flat" color="primary" onPress={handleAddImage}>
            Görsel Ekle
          </Button>
        </div>

        {/* İçerik */}
        {loading && (
          <div className="flex justify-center items-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            <span className="ml-2">Yükleniyor...</span>
          </div>
        )}

        {/* Responsive Grid: Küçük ekran = 2 sütun, orta = 3, büyük = 4, daha büyük = 5 */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {Array.isArray(images) && images.length > 0 ? (
            images.map((img) => {
              const isSelected = selectedImageId === img._id;
              return (
                <div
                  key={img._id}
                  onClick={() => handleSelectImage(img._id)}
                  className={`cursor-pointer border p-1 ${
                    isSelected ? "border-blue-500" : "border-gray-200"
                  } hover:border-blue-300 transition-colors`}
                >
                  <img
                    src={img.url}
                    alt={img.altText || "Görsel"}
                    className="w-full h-36 object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        "https://via.placeholder.com/150?text=Görsel+Yüklenemedi";
                    }}
                  />
                </div>
              );
            })
          ) : (
            <div className="col-span-full text-center py-8">
              <p className="text-gray-500">Görüntülenecek görsel bulunamadı.</p>
            </div>
          )}
        </div>

        {/* Sayfalama - NextUI Pagination kullanarak */}
        <div className="mt-6 flex justify-center flex-col items-center gap-2">
          <Pagination
            total={totalPages || 1}
            initialPage={1}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            showControls
            classNames={{
              wrapper: "gap-0 overflow-visible",
            }}
          />
        </div>

        {/* Yükleme Modalı */}
        {isUploaderOpen && (
          <ImageUploaderModal
            onClose={() => setIsUploaderOpen(false)}
            onSuccess={() => {
              setIsUploaderOpen(false);
              success("Görsel başarıyla yüklendi.");
              // Görsel eklendikten sonra ilk sayfaya dön ve yenile
              setCurrentPage(1);
              dispatch(fetchImages({ page: 1, limit: 20 }));
            }}
          />
        )}
      </div>
    </div>
  );
}

// Hata sınırı ile sarmak
function GalleryPageWithErrorBoundary() {
  return (
    <ErrorBoundary>
      <GalleryPage />
    </ErrorBoundary>
  );
}

export default GalleryPageWithErrorBoundary;
