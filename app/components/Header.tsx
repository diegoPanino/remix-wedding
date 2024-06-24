import MarqueeText from "react-marquee-text";
import LangSwitcher from "./LangSwitcher";

export default function Header() {
	return (
		<header
			className="items-center grid grid-cols-12 gap-4 py-6 text-white h-[72px] pr-4">
			<div className='col-span-11'>
				<MarqueeText
					direction='right'
					duration={25}
					pauseOnHover={true}>
					<span>
						L'amore, non altrimenti della danza delle Menadi e del
						delirante furore dei Coribanti, ci trascina in un
						universo insolito, ove in altri momenti è vietato
						avventurarci, e dove cessiamo di orientarci non appena
						l'ardore si spengne e il piacere si placa
					</span>
					<span>
						L'amor, no pas diferent de la dansa de les Mènades i del
						furor delirant dels Coribants, ens arrossega a un
						univers insòlit, on en altres moments està prohibit
						aventurar-se, i on deixem d'orientar-nos tan aviat com
						l'ardor s'apaga i el plaer s'apaga.
					</span>
					<span>
						Love, no less than the dance of the Maenads and the
						frenzied fury of the Corybants, sweeps us into an
						unfamiliar universe, where at other times it is
						forbidden to venture, and where we cease to find our way
						as soon as the ardor fades and the pleasure subsides.
					</span>
					<span>
						El amor, no menos que la danza de las Ménades y el furor
						delirante de los Coribantes, nos arrastra a un universo
						insólito, donde en otros momentos está prohibido
						aventurarse, y donde dejamos de orientarnos tan pronto
						como el ardor se apaga y el placer se aplaca.
					</span>
				</MarqueeText>
			</div>
			<div className='col-span-1 fixed top-6 right-4 z-10'>
				<LangSwitcher />
			</div>
		</header>
	);
}
