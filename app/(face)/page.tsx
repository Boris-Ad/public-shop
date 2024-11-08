import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const HomePage = async () => {
  return (
    <div className="h-full py-4 sm:container">
      <div className="h-full pb-12 ms:aspect-video relative flex justify-center items-end">
        <Image src="/shop-door.jpg" alt="shop-door" fill className="object-cover ms:object-contain" />
        <Button asChild size="lg" variant="default" className="relative w-1/2 sm:w-[300px] rounded-full bg-face-primary">
          <Link href="/catalog">В каталог</Link>
        </Button>
      </div>
    </div>
  );
};

export default HomePage;
