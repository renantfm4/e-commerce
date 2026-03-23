const ProductAdditionalInfo = () => {
  return (
    <div
      className={`rounded-xl bg-white shadow-1 p-4 sm:p-6 mt-10 block`}
    >
      <div className="rounded-md even:bg-gray-1 flex py-4 px-4 sm:px-5">
        <div className="max-w-[450px] min-w-[140px] w-full">
          <p className="text-sm sm:text-base text-dark">Marca</p>
        </div>
        <div className="w-full">
          <p className="text-sm sm:text-base text-dark">Apple</p>
        </div>
      </div>

      <div className="rounded-md even:bg-gray-1 flex py-4 px-4 sm:px-5">
        <div className="max-w-[450px] min-w-[140px] w-full">
          <p className="text-sm sm:text-base text-dark">Modelo</p>
        </div>
        <div className="w-full">
          <p className="text-sm sm:text-base text-dark">
            iPhone 14 Plus
          </p>
        </div>
      </div>

      <div className="rounded-md even:bg-gray-1 flex py-4 px-4 sm:px-5">
        <div className="max-w-[450px] min-w-[140px] w-full">
          <p className="text-sm sm:text-base text-dark">
            Tamanho da Tela
          </p>
        </div>
        <div className="w-full">
          <p className="text-sm sm:text-base text-dark">
            6.7 polegadas
          </p>
        </div>
      </div>

      <div className="rounded-md even:bg-gray-1 flex py-4 px-4 sm:px-5">
        <div className="max-w-[450px] min-w-[140px] w-full">
          <p className="text-sm sm:text-base text-dark">
            Tipo de Tela
          </p>
        </div>
        <div className="w-full">
          <p className="text-sm sm:text-base text-dark">
            Super Retina XDR OLED, HDR10, Dolby Vision, 800 nits
            (HBM), 1200 nits (pico)
          </p>
        </div>
      </div>

      <div className="rounded-md even:bg-gray-1 flex py-4 px-4 sm:px-5">
        <div className="max-w-[450px] min-w-[140px] w-full">
          <p className="text-sm sm:text-base text-dark">
            Resolução da Tela
          </p>
        </div>
        <div className="w-full">
          <p className="text-sm sm:text-base text-dark">
            1284 x 2778 pixels, proporção 19.5:9
          </p>
        </div>
      </div>

      <div className="rounded-md even:bg-gray-1 flex py-4 px-4 sm:px-5">
        <div className="max-w-[450px] min-w-[140px] w-full">
          <p className="text-sm sm:text-base text-dark">Chipset</p>
        </div>
        <div className="w-full">
          <p className="text-sm sm:text-base text-dark">
            Apple A15 Bionic (5 nm)
          </p>
        </div>
      </div>

      <div className="rounded-md even:bg-gray-1 flex py-4 px-4 sm:px-5">
        <div className="max-w-[450px] min-w-[140px] w-full">
          <p className="text-sm sm:text-base text-dark">Memória</p>
        </div>
        <div className="w-full">
          <p className="text-sm sm:text-base text-dark">
            128GB 6GB RAM | 256GB 6GB RAM | 512GB 6GB RAM
          </p>
        </div>
      </div>

      <div className="rounded-md even:bg-gray-1 flex py-4 px-4 sm:px-5">
        <div className="max-w-[450px] min-w-[140px] w-full">
          <p className="text-sm sm:text-base text-dark">
            Câmera Principal
          </p>
        </div>
        <div className="w-full">
          <p className="text-sm sm:text-base text-dark">
            12MP + 12MP | 4K@24/25/30/60fps, gravação de som estéreo.
          </p>
        </div>
      </div>

      <div className="rounded-md even:bg-gray-1 flex py-4 px-4 sm:px-5">
        <div className="max-w-[450px] min-w-[140px] w-full">
          <p className="text-sm sm:text-base text-dark">
            Câmera Selfie
          </p>
        </div>
        <div className="w-full">
          <p className="text-sm sm:text-base text-dark">
            12 MP | 4K@24/25/30/60fps, 1080p@25/30/60/120fps,
            gyro-EIS
          </p>
        </div>
      </div>

      <div className="rounded-md even:bg-gray-1 flex py-4 px-4 sm:px-5">
        <div className="max-w-[450px] min-w-[140px] w-full">
          <p className="text-sm sm:text-base text-dark">
            Informações da Bateria
          </p>
        </div>
        <div className="w-full">
          <p className="text-sm sm:text-base text-dark">
            Li-Ion 4323 mAh, não removível | 15W sem fio (MagSafe),
            7.5W sem fio (Qi)
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductAdditionalInfo;