function UmkmCard({ product, imgUrl, address }: any) {
  return (
    <div className="bg-[#ffff] px-2 py-4 w-1/5 rounded-xl shadow-2xl">
      <div className="h-[300px] flex items-center justify-center">
        <img
          className="max-w-full max-h-full object-cover"
          src={imgUrl}
          alt=""
        />
      </div>
      <div className="pl-4 overflow-hidden border-t-[1px] pt-5 h-[110px]">
        <h3 className="font-semibold text-xl">{product}</h3>
        <p className="text-base text-[#999]">{address}</p>
      </div>
    </div>
  );
}

export default UmkmCard;
