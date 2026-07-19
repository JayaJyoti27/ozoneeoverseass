import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/Employer/jobs')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/Employer/jobs"!</div>
}
