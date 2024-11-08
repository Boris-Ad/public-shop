import React from 'react';
import { Card, CardContent, CardHeader,CardDescription, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export const DashboardCard = ({ title, subtitle, text,path }: { title: string; subtitle: string; text: string,path:string }) => {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>{title}</span>
            <Button asChild variant='outline' size='sm'>
              <Link href={path}>
                <ChevronRight size={22} />
              </Link>
            </Button>
            </CardTitle>
          <CardDescription>{subtitle}</CardDescription>
        </CardHeader>
        <CardContent>
          <p>{text}</p>
        </CardContent>
      </Card>
    );
  };