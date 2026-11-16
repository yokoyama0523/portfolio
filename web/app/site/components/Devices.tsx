type Props = { src: string; alt?: string };

export function LaptopMock({ src, alt = "" }: Props) {
  return (
    <span className="block w-full">
      <span className="block rounded-t-[10px] border-[6px] border-b-0 border-[#1d1d1f] bg-[#1d1d1f] p-0">
        <span className="block aspect-[16/10] overflow-hidden rounded-t-[4px] bg-white">
          <img
            src={src}
            alt={alt}
            loading="lazy"
            decoding="async"
            className="size-full object-cover object-top"
          />
        </span>
      </span>
      <span className="mx-[-6%] block h-2.5 rounded-b-[10px] bg-gradient-to-b from-[#cfd2d8] to-[#a9adb5]" />
    </span>
  );
}

export function PhoneMock({ src, alt = "" }: Props) {
  return (
    <span className="block w-full rounded-[22px] border-[6px] border-[#1d1d1f] bg-[#1d1d1f] shadow-[0_24px_50px_-24px_rgba(0,0,0,0.5)]">
      <span className="block aspect-[390/800] overflow-hidden rounded-[16px] bg-white">
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          className="size-full object-cover object-top"
        />
      </span>
    </span>
  );
}
