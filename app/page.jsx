import VoyageCanvas from '@/components/voyage/VoyageCanvas'
import Launch from '@/components/chapters/Launch'
import Pilot from '@/components/chapters/Pilot'
import FlightPath from '@/components/chapters/FlightPath'
import Worlds from '@/components/chapters/Worlds'
import Systems from '@/components/chapters/Systems'
import Destination from '@/components/chapters/Destination'
import Transmission from '@/components/chapters/Transmission'

export default function Home() {
  return (
    <>
      <VoyageCanvas />
      <main className="relative z-10 pt-14">
        <Launch />
        <Pilot />
        <FlightPath />
        <Worlds />
        <Systems />
        <Destination />
        <Transmission />
      </main>
    </>
  )
}
