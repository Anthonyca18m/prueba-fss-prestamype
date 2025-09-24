<template>
	<section class="bg-gradient-purple text-white py-5 min-vh-100 d-flex align-items-center">
		<div class="container">
			<div class="row justify-content-center align-items-center text-center text-md-start">
				<div class="col-12 col-md-6 mb-4 mb-md-0">
					<h1 class="fw-bold display-5">
						El mejor <br />
						tipo de cambio
					</h1>
					<p class="mt-2 fs-5">para cambiar dólares y soles<br />online en Perú</p>
				</div>
				<div class="col-12 col-md-5">
					<div class="card shadow-sm" style="max-width: 450px;">
						<div class="card-header px-0 border-0 bg-transparent">
							<div class="d-flex justify-content-between border-bottom">
								<Tab label="Dólar compra"
									:value="store.formattedPurchasePrice"
									:active="store.isSolesToDollars"
								/>
								<Tab label="Dólar venta"
									:value="store.formattedSalePrice"
									:active="!store.isSolesToDollars"
								/>
							</div>
						</div>
						<div class="card-body">
							<div class="row justify-content-center">
								<div class="col-9 mb-4">
									<CurrencyInput :label="store.currencyInfo.inLabel" 
										:symbol="store.currencyInfo.inSymbol" 
										v-model="store.inputAmount" 
										:readonly="false" text-right="Envías" title="Monto que enviarás"/>
								</div>
								<div @click="store.toggleExchangeType" class="swap-icon cursor-pointer" title="Actualizar Tipo de Cambio">
									<i class="fas fa-sync"></i>
								</div>
								<div class="col-9">
									<CurrencyInput :label="store.currencyInfo.outLabel"
										:symbol="store.currencyInfo.outSymbol" 
										v-model="store.outputAmount"
										:readonly="true" text-right="Recibes" title="Monto que recibirás"/>
								</div>
								<div class="col-9 py-5">
									<button class="btn btn-lg btn-primary w-100 mt-3">Iniciar operación</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
import { onUnmounted, defineComponent } from 'vue'
import { useExchangeStore } from './store/exchangeStore'
import CurrencyInput from './components/CurrencyInput.vue'
import Tab from './components/Tab.vue'

defineComponent({
	components: {
		CurrencyInput,
		Tab
	}
})

const store = useExchangeStore()

onUnmounted(() => {
	store.dispose()
});
</script>

<style scoped>
.bg-gradient-purple {
	background: linear-gradient(135deg, #5f00ba, #7735ff);
}

.text-primary {
	color: #2f00ff !important;	
}

.btn-primary {
	background-color: #2f00ff !important;	
}

.swap-icon {
  width: 50px;
  height: 50px;
  position: absolute;
  top: 40.5%;
  transform: translateY(-50%);
  z-index: 1;
  font-size: 20px;
  background-color: #2f00ff;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.cursor-pointer {
	cursor: pointer;
}
</style>
