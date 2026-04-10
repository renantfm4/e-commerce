const ProductDescription = () => {
  return (
    <div
      className={`flex-col sm:flex-row gap-7.5 xl:gap-12.5 mt-12.5 flex`}
    >
      <div className="max-w-[670px] w-full">
        <h2 className="font-medium text-2xl text-dark mb-7">
          Especificações:
        </h2>
        <p className="mb-6">
          Lorem Ipsum is simply dummy text of the printing and
          typesetting industry. Lorem Ipsum has been the
          industry&apos;s standard dummy text ever since the 1500s,
          when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.
        </p>
        <p className="mb-6">
          It has survived not only five centuries, but also the leap
          into electronic typesetting, remaining essentially
          unchanged. It was popularised in the 1960s.
        </p>
        <p>
          with the release of Letraset sheets containing Lorem Ipsum
          passages, and more recently with desktop publishing
          software like Aldus PageMaker including versions.
        </p>
      </div>
      <div className="max-w-[447px] w-full">
        <h2 className="font-medium text-2xl text-dark mb-7">
          Cuidados & Manutenção:
        </h2>
        <p className="mb-6">
          Lorem Ipsum is simply dummy text of the printing and
          typesetting industry. Lorem Ipsum has been the
          industry&apos;s standard dummy text ever since the 1500s,
          when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.
        </p>
        <p>
          It has survived not only five centuries, but also the leap
          into electronic typesetting, remaining essentially
          unchanged. It was popularised in the 1960s.
        </p>
      </div>
    </div>
  );
};

export default ProductDescription;