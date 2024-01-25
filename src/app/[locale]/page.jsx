import Gallery from '@/components/gallery';
import Map from '@/components/map';
import Menu from '@/components/menu';
import translation from '@/constants/locales/translation';

export default function Home() {
  return (
    <main className='min-h-screen w-full flex flex-col'>
      <Map />
      <Menu translate={translation()} />
      <Gallery />
    </main>
  );
}
