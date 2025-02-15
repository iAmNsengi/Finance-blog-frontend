import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
} from "@nextui-org/react";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUser, logoutUser } from "../../app/features/user/userSlice";
import SearchModal from "../yardımcılar/SearchModal";
import { Icon } from "@iconify/react";

export const AcmeLogo = () => {
  return (
    <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
      <path
        clipRule="evenodd"
        d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
};

export default function CustomNavbar() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const isAdmin = useSelector((state) => state.user.isAdmin);

  // Arama modalının açılıp kapanma durumunu yönetiyoruz
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Navbar ilk yüklendiğinde fetchUser çağrılıyor
  useEffect(() => {
    console.log("Navbar yüklenirken fetchUser çağrılıyor...");
    dispatch(fetchUser());
  }, [dispatch]);

  // Logout işlemini gerçekleştiren fonksiyon
  const handleLogoutClick = () => {
    console.log("Logout işlemi başlatılıyor...");
    dispatch(logoutUser())
      .unwrap()
      .then(() => {
        console.log("Logout başarılı, yönlendiriliyor...");
        window.location.href = "/blog-admin/login";
      })
      .catch((error) => {
        console.error("Logout sırasında hata oluştu:", error);
      });
  };

  return (
    <>
      <Navbar className="bg-gray-50">
        <NavbarBrand>
          <AcmeLogo />
          <p className="font-bold text-inherit text-lg">Fin AI</p>
        </NavbarBrand>

        {/* Orta kısım (menü) */}
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem>
            <Link to="/blog/posts/">Anasayfa</Link>
          </NavbarItem>
          <NavbarItem>
            <Link to="/blog/posts/">Makro Ekonomi</Link>
          </NavbarItem>
          <NavbarItem>
            <Link to="/blog/posts/">Mikro Ekonomi</Link>
          </NavbarItem>
          <NavbarItem>
            <Link to="/blog/posts/">Finans</Link>
          </NavbarItem>
        </NavbarContent>
        {/* Arama ikonu */}
        <NavbarItem justify="end" className="mx-4 w-24">
          <Button
            variant="ghost"
            color="default"
            radius="lg"
            fullWidth={true}
            startContent={<Icon icon="material-symbols:search" width="16" />}
            size="md"
            onClick={() => setIsSearchOpen(true)}
          >
            Ara
          </Button>
        </NavbarItem>
        {/* Sağ kısım */}
        <NavbarContent className="mx-2">
          {/* Kullanıcı giriş yapmamışsa Mail Bülteni butonu */}
          {!isLoggedIn ? (
            <NavbarItem>
              <Button as={Link} color="default" to="/signup" variant="flat">
                Mail Bültenimize Katıl
              </Button>
            </NavbarItem>
          ) : (
            // Giriş yapmışsa Profil ve Çıkış
            <>
              <NavbarItem>
                <Link to="/profile">Profil</Link>
              </NavbarItem>
              <NavbarItem>
                <Button onClick={handleLogoutClick}>Çıkış Yap</Button>
              </NavbarItem>
            </>
          )}
        </NavbarContent>
      </Navbar>

      {/* Arama Modalı */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
}
