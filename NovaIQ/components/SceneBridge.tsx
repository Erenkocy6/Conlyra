type SceneBridgeProps = {
  index: string;
  title: string;
  eyebrow?: string;
};

export function SceneBridge({
  index,
  title,
  eyebrow = "Scene shift",
}: SceneBridgeProps) {
  return (
    <section className="scene-bridge" aria-label={title} data-scene-bridge>
      <div className="scene-bridge__inner" data-reveal>
        <span>{index}</span>
        <p>{eyebrow}</p>
        <strong>{title}</strong>
        <i aria-hidden="true" />
        <i aria-hidden="true" />
      </div>
    </section>
  );
}
