import Providers from '@/components/Providers';
import Layout from '@/components/Layout/Layout';
import Counter from '@/components/Counter/Counter';
import TodoList from '@/components/TodoList/TodoList';

export default function HomePage() {
  return (
    <Providers>
      <Layout>
        <div className="max-w-4xl mx-auto space-y-6">
          <Counter />
          <TodoList />
        </div>
      </Layout>
    </Providers>
  );
}
