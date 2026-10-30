import { cn } from '@thinkbuff/figma-react/utils';

interface SectionProps {
  id: string;
  title: string;
  children: React.ReactNode;
}

function Section({ id, title, children }: SectionProps) {
  return (
    <section
      id={id}
      className="scroll-mt-4 border-b border-figma pb-6 last:border-b-0"
    >
      <h2 className="mb-4 font-figma-strong text-figma-body-large text-figma">{title}</h2>
      <div className="flex flex-col gap-5">{children}</div>
    </section>
  );
}

interface DemoProps {
  label: string;
  className?: string;
  children: React.ReactNode;
}

function Demo({ label, className, children }: DemoProps) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-figma-body-medium text-figma-secondary">{label}</span>
      <div className={cn('flex flex-wrap items-center gap-3', className)}>{children}</div>
    </div>
  );
}

export { Demo, Section };
