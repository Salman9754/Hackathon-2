// biome-ignore lint/performance/noNamespaceImport: dont mess with lib code
import * as AspectRatioPrimitive from '@radix-ui/react-aspect-ratio';

function AspectRatio({
  ...props
}: React.ComponentProps<typeof AspectRatioPrimitive.Root>) {
  return <AspectRatioPrimitive.Root data-slot="aspect-ratio" {...props} />;
}

export { AspectRatio };
