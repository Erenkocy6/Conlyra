import Image from "next/image";
import { cn } from "@/lib/utils";

type StockImageFrameProps = {
  src: string;
  title: string;
  label: string;
  metric: string;
  source?: string;
  className?: string;
};

export function StockImageFrame({
  src,
  title,
  label,
  metric,
  source = "stock placeholder",
  className,
}: StockImageFrameProps) {
  return (
    <figure
      className={cn(
        "nova-image group relative min-h-[26rem] overflow-hidden border border-white/10 bg-ink",
        className,
      )}
      data-cursor-label={metric}
    >
      <Image
        src={src}
        alt={title}
        fill
        sizes="(min-width: 1024px) 34vw, 100vw"
        className="absolute inset-0 h-full w-full object-cover opacity-78 saturate-[0.9] transition duration-700 group-hover:scale-[1.04] group-hover:opacity-95"
      />
      <div className="nova-image__wash" aria-hidden="true" />
      <figcaption className="absolute inset-x-0 bottom-0 z-10 p-5">
        <div className="mb-5 flex items-center justify-between gap-4">
          <p className="text-xs font-bold uppercase tracking-[0.08em] text-cyan">
            {label}
          </p>
          <span className="border border-white/12 bg-ink/54 px-3 py-1.5 text-[0.65rem] font-bold uppercase tracking-[0.08em] text-paper/58 backdrop-blur">
            {source}
          </span>
        </div>
        <p className="max-w-lg text-3xl font-semibold leading-none tracking-[-0.045em] text-paper">
          {title}
        </p>
        <p className="mt-4 w-fit border border-acid/20 bg-acid/[0.1] px-3 py-1.5 text-xs font-bold uppercase tracking-[0.08em] text-acid">
          {metric}
        </p>
      </figcaption>
    </figure>
  );
}
