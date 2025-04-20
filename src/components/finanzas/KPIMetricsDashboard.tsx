'use client';

import React from 'react';
import KPICard from './KPICard';
import { formatCurrency } from '@/lib/utils';

interface KPIMetricsDashboardProps {
  data: {
    totalOutstandingBalance: number;
    paymentsLastThirtyDays: {
      totalAmount: number;
      count: number;
    };
    overdueClientsCount: number;
    pendingCreditOrdersCount: number;
  };
}

export default function KPIMetricsDashboard({ data }: KPIMetricsDashboardProps) {
  // Apply defaults for any potentially missing data
  const {
    totalOutstandingBalance = 0,
    paymentsLastThirtyDays = { totalAmount: 0, count: 0 },
    overdueClientsCount = 0,
    pendingCreditOrdersCount = 0
  } = data || {};
  
  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4">Métricas Financieras</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Saldo Total Pendiente"
          value={formatCurrency(totalOutstandingBalance)}
          description="Suma de todos los balances de clientes"
          icon={<span className="text-xl">💰</span>}
          valueClassName={totalOutstandingBalance > 0 ? "text-red-600" : "text-green-600"}
        />
        
        <KPICard
          title="Pagos Recibidos (30 días)"
          value={formatCurrency(paymentsLastThirtyDays.totalAmount)}
          description={`${paymentsLastThirtyDays.count} pagos en los últimos 30 días`}
          icon={<span className="text-xl">💳</span>}
        />
        
        <KPICard
          title="Clientes con Saldo Pendiente"
          value={overdueClientsCount}
          description="Clientes con balance mayor a cero"
          icon={<span className="text-xl">👥</span>}
        />
        
        <KPICard
          title="Órdenes Pendientes de Crédito"
          value={pendingCreditOrdersCount}
          description="Órdenes que requieren aprobación de crédito"
          icon={<span className="text-xl">📋</span>}
        />
      </div>
    </section>
  );
} 