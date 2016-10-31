<?php

namespace AppBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

class DefaultController extends Controller
{
    /**
     * @Route("/", name="homepage")
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function indexAction()
    {
        return $this->render('AppBundle:default:index.html.twig', []);
    }

    /**
     * @Route("/api/order", name="order")
     * @Method("POST")
     * @param Request $request
     * @return JsonResponse
     */
    public function orderAction(Request $request)
    {
        sleep(1);
        $name = $request->request->get("name");
        $phone = $request->request->get("phone");

        $headers = 'From: primorye3d@gmail.com' . "\r\n" .
        'Reply-To: primorye3d@gmail.com' . "\r\n" .
        'X-Mailer: PHP/' . phpversion();
        mail(
            'primorye3d@gmail.com',
            'Order',
            $this->renderView(
                    '@App/message/order.html.twig',
                    [
                        'name' => $name,
                        'phone' => $phone
                    ]
                ),
            $headers
        );

        return new JsonResponse();
    }
}
