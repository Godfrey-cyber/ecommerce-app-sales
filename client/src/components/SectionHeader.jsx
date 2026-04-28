import React from 'react'

const SectionHeader = ({ title, icon: Icon, iconColor }) => (
	<div className="mb-6">
		<div className="flex items-center gap-2.5 mb-3">
			<div className={`w-8 h-8 rounded-lg ${iconColor} flex items-center justify-center flex-shrink-0`}>
				<Icon className="w-4 h-4 text-white" strokeWidth={2.5} />
			</div>
			<h2 className="text-lg font-bold text-gray-900 tracking-tight">
				{title}
			</h2>
		</div>
		<div className="h-0.5 bg-gradient-to-r from-orange-500 via-orange-300 to-transparent rounded-full" />
	</div>
);

export default SectionHeader