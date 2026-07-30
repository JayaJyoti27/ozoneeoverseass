import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/Employer/candidates')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/Employer/candidates"!</div>
}
