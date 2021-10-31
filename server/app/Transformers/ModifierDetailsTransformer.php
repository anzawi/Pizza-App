<?php

namespace App\Transformers;

use App\Models\ModifierDetail;
use League\Fractal\TransformerAbstract;

class ModifierDetailsTransformer extends TransformerAbstract
{

    /**
     * A Fractal transformer.
     *
     * @return array
     */
    public function transform(ModifierDetail $detail)
    {
        return $detail->values;
    }
}
