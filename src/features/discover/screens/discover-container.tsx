import { useGarden } from "@/features/garden";

import { HEALTHY_TIP, THIRSTY_TIP } from "../data/discover-mock";
import { DiscoverView } from "./discover-view";

export function DiscoverScreen() {
	const { plantsNeedingCare } = useGarden();

	// Le conseil du jour répond à la situation : arrosage quand ça urge, entretien sinon.
	const featuredTip = plantsNeedingCare > 0 ? THIRSTY_TIP : HEALTHY_TIP;

	return <DiscoverView featuredTip={featuredTip} />;
}
