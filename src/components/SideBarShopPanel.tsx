import { SideBarPanel } from './SideBarPanels'
import { $sidebar } from './SideBar.state'
import { ModelPreview } from './ModelPreview'
import { datass } from '../modules/datass'
import { Flow } from './Flow'
import { api } from '../stores/supabase'
import debounce from 'just-debounce'
import { Suspense } from 'react'

const $modelsList = datass.array([])
const $query = datass.string('')
const $page = datass.number(1)

const getPageOfModels = (models, page, pageSize) => {
  return models.slice((page - 1) * pageSize, page * pageSize)
}

const fetchResults = debounce(async (query) => {
  console.log('fetching results', query)
  const [error, results] = await api.searchModels({ query })
  console.log(error, results)
  $modelsList.set(results as any[])
}, 1000)

export const SideBarShopPanel = (props) => {
  const isActive = $sidebar.activeMenuName.use() === 'shop'
  const query = $query.use()
  const models = $modelsList.use()
  const pageModels = getPageOfModels(models, $page.use(), 5)
  console.log({ pageModels })
  if (!isActive) return null

  const handleQueryChange = async (e) => {
    const query = e.target.value
    $query.set(query)
    fetchResults(query)
  }

  const headerAccessory = (
    <Flow isRow width="100%" className="searchAccessory" marginTop="8px">
      <fieldset className="FlowFieldset">
        <label className="FlowFieldsetLabel" htmlFor="query">
          <input value={query} className="FlowFieldsetInput" id="query" placeholder="Search" onChange={handleQueryChange} />
        </label>
      </fieldset>
    </Flow>
  )

  return (
    <SideBarPanel title="Shop" headerAccessory={headerAccessory}>
      <Flow isRow wrap="wrap" width="100%">
        {pageModels.map((model) => (
          <Suspense
            key={model.id}
            fallback={
              <Flow width="100%" height="48px" padding="16px" justify="center" align="center">
                Loading...
              </Flow>
            }
          >
            <Flow width="100%">
              <ModelPreview file={model.file} />
            </Flow>
          </Suspense>
        ))}
      </Flow>
    </SideBarPanel>
  )
}
