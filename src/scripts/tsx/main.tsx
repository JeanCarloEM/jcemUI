import { render } from 'preact';
import '../../assets/css/tailwind.css';
import '../../__generated__/fontawesome';
import { ContentWrapper } from '../components/ContentWrapper/ContentWrapper';
import { FooterZone } from '../components/FooterZone/FooterZone';
import { HeaderBar } from '../components/HeaderBar/HeaderBar';
import { HeaderZone } from '../components/HeaderZone/HeaderZone';
import { PageZone } from '../components/PageZone/PageZone';

export default function Master() {
	return (
		<PageZone
			variant="border"
			shadow="lg"
			compact
			left={{
				itens: [
					{ label: 'Home', icon: 'house', kind: 'button' },
					{
						kind: 'menu',
						label: 'Mais',
						icon: 'bars',
						itens: [
							{ label: 'Perfil', icon: 'user', kind: 'button' },
							{ label: 'Sair', icon: 'power', kind: 'button' },
						],
					},
				],
			}}
			right={{
				itens: [
					{ label: 'Home', icon: 'house', kind: 'button' },
					{
						kind: 'menu',
						label: 'Mais',
						icon: 'bars',
						itens: [
							{ label: 'Perfil', icon: 'user', kind: 'button' },
							{ label: 'Sair', icon: 'power', kind: 'button' },
						],
					},
				],
			}}
		>
			{/* HeaderZone: primeiro filho */}
			<HeaderZone>
				<HeaderBar />
			</HeaderZone>

			{/* ContentWrapper: terceiro filho obrigatório */}
			<ContentWrapper>
				<section>
					<h1>Dashboard</h1>
					<p>Conteúdo principal da aplicação.</p>
				</section>
			</ContentWrapper>

			{/* FooterZone: último filho */}
			<FooterZone>
				<p>Rodapé © 2025</p>
			</FooterZone>
		</PageZone>
	);
}

render(<Master />, document.getElementById('Master')!);
