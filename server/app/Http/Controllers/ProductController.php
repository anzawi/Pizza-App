<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Transformers\ProductTransformer;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * get all products : GET
     * Display a listing of the resource.
     * @return array
     */
    public function index()
    {
        return fractal()
            ->collection(Product::all())
            ->transformWith(new ProductTransformer())
            ->toArray();
    }

    /**
     * Show the form for creating a new resource. : GET
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        dd('create');
    }


    public function store(Request $request)
    {
        $data = $request->data;
        $modifiers = $request->modifiers;
        $modifiersTitles = [];
        $modifiersValues = [];

        $product = [
            'title' => $data['title'],
            'description' => $data['description'],
            'img_uri' => $data['image'],
        ];

        // remove init values
        unset($modifiers[0]);

        /**
         * handle modifiers
         */
        foreach ($modifiers as $modifier) {
            $modifiersTitles[$modifier['parent']]
                = $data[$modifier['parent']] ?? 'untitled';

            foreach ($modifier['child'] as $item) {
                $modifiersValues[$modifier['parent']][]
                    = $data[$item] ?? 'unset option';
            }
        }
         // create product

        $createdProduct = Product::create($product);

        foreach ($modifiersTitles as $key => $value) {
            $createdModifier = $createdProduct->modifiers()->create([
                'name' => $value
            ]);

            $createdModifier->details()->create([
                'key' => 'key',
                'values' => $modifiersValues[$key]
            ]);
        }
    }

    /**
     * Display the specified resource. : GET
     *
     * @param  Product  $product
     * @return array
     */
    public function show(Product $product)
    {
        return fractal()
            ->item($product)
            ->transformWith(new ProductTransformer())
            ->parseIncludes([
                'modifiers'
            ])
            ->toArray();
    }

    /**
     * Show the form for editing the specified resource. : GET
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        dd('edit');
    }

    /**
     * Update the specified resource in storage. : PUT / PATCH
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        dd('update');
    }

    /**
     * Remove the specified resource from storage. : DELETE
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Product $product)
    {
        $product->delete();
        return response()->json([
            'data' => [
                'status' => 200
            ]
        ]);
    }

    public function upload(Request $request)
    {
        if($request->hasFile('img')) {
            $fileNameWithExt = $request->file('img')->getClientOriginalName();
            $fileName = pathinfo($fileNameWithExt, PATHINFO_FILENAME);
            $ext = $request->file('img')->getClientOriginalExtension();
            if(!$ext) $ext = $request->file('img')->guessExtension();
            $fileNameToStore = $fileName . '_' . time() . '.' . $ext;

            try {
                $request->file('img')->move(public_path('images/'), $fileNameToStore);
            }
            catch (\Exception $e) {
                var_dump($e->getMessage());
            }

            return response()->json([
                'data' => [
                    'img' => $fileNameToStore
                ]
            ]);
        }
        return abort(402);
    }
}
